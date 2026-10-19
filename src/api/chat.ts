import { randomUUID } from 'crypto';

import {
  type CreateChatResponse,
  CreateChatSchema,
  type CreateMessageResponse,
  CreateMessageSchema,
} from '../dto/chat';
import type { Http } from '../client/http';
import type { Message, Chat } from '../entities/index';

export class ChatAPI {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public create = async (targetUserID: string): Promise<Chat> =>
    (
      await this.http.post<CreateChatResponse>(
        { path: `/chats/create`, body: JSON.stringify({ targetUserID }) },
        CreateChatSchema,
      )
    ).data.chatChannelInfo;

  public text = async (channelID: string, text: string): Promise<Message> =>
    (
      await this.http.post<CreateMessageResponse>(
        {
          path: `/im/messages/create`,
          body: JSON.stringify({
            channelID,
            text,
            mentionUserIds: [],
            extraData: {
              local_id: `local_${randomUUID()}`,
            },
          }),
        },
        CreateMessageSchema,
      )
    ).data.message;
}
