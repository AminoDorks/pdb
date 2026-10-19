import z from 'zod';

export const PostSchema = z.object({
  title: z.string().optional(),
  author: z.object({
    id: z.string(),
    username: z.string(),
  }),
  id: z.string(),
  content: z.string(),
});

export type Post = z.infer<typeof PostSchema>;
