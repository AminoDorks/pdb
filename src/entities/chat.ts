import z from 'zod';

export const ChatSchema = z.object({
  id: z.string(),
  type: z.string(),
  channelID: z.string(),
  creator: z.string(),
});

export type Chat = z.infer<typeof ChatSchema>;
