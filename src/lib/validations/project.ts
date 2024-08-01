import { z } from 'zod';

export const CreateProjectFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  data: z.string().min(1, { message: 'Data is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
});
