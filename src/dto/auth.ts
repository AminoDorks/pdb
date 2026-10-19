import z from 'zod';

import { CommonSchema } from './common';

export const SendDigitsSchema = z.object({
  data: z.object({
    email: z.string(),
    isNewUser: z.boolean(),
  }),
  ...CommonSchema.shape,
});

export const LoginSchema = z.object({
  data: z.object({
    user: z.object({
      id: z.string(),
      username: z.string(),
    }),
    isNewUser: z.boolean(),
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
  ...CommonSchema.shape,
});

export type SendDigitsResponse = z.infer<typeof SendDigitsSchema>;
export type LoginResponse = z.infer<typeof LoginSchema>;
