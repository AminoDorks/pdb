import z from 'zod';

export const BoardSchema = z.object({
  id: z.string(),
  name: z.string(),
  wiki: z.string(),
  image: z.object({
    picURL: z.string(),
  }),
  memberCount: z.number(),
  postCount: z.number(),
  isJoined: z.boolean().optional(),
});

export type Board = z.infer<typeof BoardSchema>;
