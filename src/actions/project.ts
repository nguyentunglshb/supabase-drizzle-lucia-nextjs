'use server'

import { db } from "@/lib/database";
import { project } from "@/lib/database/schema";

// import { lucia } from '@/lib/auth';
// import { cookies } from 'next/headers';
export const createProject = async (formData: FormData) => {
    const body = Array.from(formData.entries()).reduce((memo, [key, value]) => ({
        ...memo,
        [key]: value,
      }), {});


      const newProject = await db.insert(project).values({
        ...body
      })

      console.log({newProject});
      

      return newProject
      

}