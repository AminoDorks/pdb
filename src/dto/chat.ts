import z from 'zod';

import { ChatSchema } from '../entities/chat';
import { CommonSchema } from './common';
import { MessageSchema } from '../entities/message';

export const CreateChatSchema = z.object({
  data: z.object({
    chatChannelInfo: ChatSchema,
  }),
  ...CommonSchema.shape,
});

export const CreateMessageSchema = z.object({
  data: z.object({
    message: MessageSchema,
  }),
  ...CommonSchema.shape,
});

export type CreateChatResponse = z.infer<typeof CreateChatSchema>;
export type CreateMessageResponse = z.infer<typeof CreateMessageSchema>;
