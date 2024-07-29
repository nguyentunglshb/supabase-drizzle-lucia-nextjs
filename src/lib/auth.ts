// src/auth.ts
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';

import { db } from './database';
import { session as sessionTable, user as userTable } from './database/schema';

interface DatabaseUserAttributes {
  username: string;
}

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable); // your adapter

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => ({
    username: attributes.username,
  }),
});

// IMPORTANT!
declare module 'lucia' {
  // eslint-disable-next-line no-unused-vars
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
