import z from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  image: z.object({
    picURL: z.string(),
  }),
  backgroundImage: z.string().nullable(),
  bio: z.string(),
  isMod: z.boolean(),
  isTrusted: z.boolean(),
  dateJoined: z.number(),
  lastSeen: z.number(),
  followers: z.number(),
  following: z.number(),
});

export type User = z.infer<typeof UserSchema>;
