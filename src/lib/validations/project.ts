import {z} from 'zod'

export const CreateProjectFormSchema = z.object({
    name: z.string(),
    data: z.string(),
    description: z.string(),
})