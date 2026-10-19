import z from 'zod';

import { ProfileSchema } from '../entities/profile';

export const CommonSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});

export type CommonResponse = z.infer<typeof CommonSchema>;
