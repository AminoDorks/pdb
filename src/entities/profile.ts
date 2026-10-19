import z from 'zod';

export const ProfileSchema = z.object({
  subcategory: z.object({
    id: z.string(),
    name: z.string(),
  }),
  subTitle: z.string(),
  profiles: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
});

export type Profile = z.infer<typeof ProfileSchema>;
