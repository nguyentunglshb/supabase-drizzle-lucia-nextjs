'use server';

import { cache } from 'react';

import { hash, verify } from '@node-rs/argon2';
import { generateIdFromEntropySize, type Session, type User } from 'lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { lucia } from '@/lib/auth';
import { db } from '@/lib/database';
import { user } from '@/lib/database/schema';

interface ActionResult {
  error: string;
}

export async function signup(
  //   _: any,
  formData: FormData
): Promise<ActionResult> {
  const username = formData.get('username');
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  if (
    typeof username !== 'string' ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: 'Invalid username',
    };
  }
  const password = formData.get('password');
  if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
    return {
      error: 'Invalid password',
    };
  }

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  const userId = generateIdFromEntropySize(10); // 16 characters long

  // TODO: check if username is already used
  //   await db.table("users").insert({
  //     id: userId,
  //     username: username,
  //     password_hash: passwordHash,
  //   });

  await db.insert(user).values({
    id: userId,
    username,
    password_hash: passwordHash,
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect('/');
}

export async function login(formData: FormData): Promise<ActionResult> {
  const username = formData.get('username');
  if (
    typeof username !== 'string' ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: 'Invalid username',
    };
  }
  const password = formData.get('password');
  if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
    return {
      error: 'Invalid password',
    };
  }

  // const existingUser = await db
  //   .table("user")
  //   .where("username", "=", username.toLowerCase())
  //   .get();

  const existingUser = await db.query.user.findFirst({
    where(fields, operators) {
      return operators.eq(fields.username, username.toLowerCase());
    },
  });

  if (!existingUser) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid usernames from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid usernames.
    // However, valid usernames can be already be revealed with the signup page among other methods.
    // It will also be much more resource intensive.
    // Since protecting against this is non-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If usernames are public, you may outright tell the user that the username is invalid.
    return {
      error: 'Incorrect username or password',
    };
  }

  const validPassword = await verify(existingUser.password_hash!, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  if (!validPassword) {
    return {
      error: 'Incorrect username or password',
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect('/');
}

export const validateRequest = cache(
  async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
    } catch {
      /* empty */
    }
    return result;
  }
);

export async function logout(): Promise<ActionResult> {
  const { session } = await validateRequest();

  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect('/login');
}
