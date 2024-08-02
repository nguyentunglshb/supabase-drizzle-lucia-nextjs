'use server';

import { db } from '@/lib/database';
import { project, session as sessionTable } from '@/lib/database/schema';
import { actionClient } from '@/lib/safe-action';
import { CreateProjectFormSchema } from '@/lib/validations/project';
import { eq } from 'drizzle-orm';
import { validateRequest } from './auth';

export const createProject = actionClient
  .schema(CreateProjectFormSchema)
  .action(async ({ parsedInput }) => {
    const { session } = await validateRequest();

    if (session) {
      const existingSession = await db
        .select()
        .from(sessionTable)
        .where(eq(sessionTable.userId, session.userId))
        .limit(1);

      if (!existingSession?.[0]?.userId) {
        return {
          error: 'Unauthorized',
        };
      }

      return await db
        .insert(project)
        .values({ ...parsedInput, ownerId: session.userId })
        .returning();
    }

    return {
      error: 'Unauthorized',
    };
  });
