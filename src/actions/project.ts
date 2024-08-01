'use server';

import { db } from '@/lib/database';
import { project } from '@/lib/database/schema';
import { actionClient } from '@/lib/safe-action';
import { CreateProjectFormSchema } from '@/lib/validations/project';

export const createProject = actionClient
  .schema(CreateProjectFormSchema)
  .action(async ({ parsedInput }) => {
    return await db
      .insert(project)
      .values({ ...parsedInput })
      .returning();
  });
