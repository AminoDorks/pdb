import type { Logger } from 'pino';

import { createLogger } from '../util/logger';
import { Http } from './http';
import { UserAPI, AuthAPI, BoardAPI, ChatAPI } from '../api';
import type { Config, ShortAccountInfo } from '../types/pdb';

export class PersonalityDatabase {
  private logger: Logger;
  private http: Http;

  private authApi?: AuthAPI;
  private userApi?: UserAPI;
  private boardApi?: BoardAPI;
  private chatApi?: ChatAPI;

  constructor(config: Config = {}) {
    this.logger = createLogger(!!config.enableLogging);
    this.http = new Http(this.logger);
  }

  get auth(): AuthAPI {
    if (!this.authApi) this.authApi = new AuthAPI(this.http);

    return this.authApi;
  }

  get user(): UserAPI {
    if (!this.userApi) this.userApi = new UserAPI(this.http, this.account);

    return this.userApi;
  }

  get board(): BoardAPI {
    if (!this.boardApi) this.boardApi = new BoardAPI(this.http);

    return this.boardApi;
  }

  get chat(): ChatAPI {
    if (!this.chatApi) this.chatApi = new ChatAPI(this.http);

    return this.chatApi;
  }

  get account(): ShortAccountInfo {
    return this.auth.account;
  }

  set proxy(value: string | undefined) {
    this.http.proxy = value;
  }

  public healthcheck = async (): Promise<boolean> =>
    await this.http.healthcheck();
}
