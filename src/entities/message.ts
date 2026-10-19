import z from 'zod';

export const MessageSchema = z.object({
  id: z.string(),
  channelID: z.string(),
  creator: z.object({
    id: z.string(),
    username: z.string(),
  }),
  text: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;
