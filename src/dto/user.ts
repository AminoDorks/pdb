import z from 'zod';

import { CommonSchema } from './common';
import { UserSchema } from '../entities/user';

export const GetUserSchema = z.object({
  data: z.object({
    user: UserSchema,
  }),
  ...CommonSchema.shape,
});

export type GetUserResponse = z.infer<typeof GetUserSchema>;
