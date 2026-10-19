import { PDBError } from '../util/errors';
import { extractAccountInfo } from '../util/cryptography';
import {
  LoginSchema,
  SendDigitsSchema,
  type LoginResponse,
  type SendDigitsResponse,
} from '../dto/auth';
import type { Http } from '../client/http';
import type { ShortAccountInfo } from '../types/pdb';

export class AuthAPI {
  private _account?: ShortAccountInfo;
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  get account() {
    if (!this._account) throw new PDBError('Unauthorized');

    return this._account;
  }

  public sendDigits = async (email: string): Promise<SendDigitsResponse> =>
    await this.http.post<SendDigitsResponse>(
      {
        path: '/oauth/email/send_digits',
        body: JSON.stringify({ email }),
      },
      SendDigitsSchema,
    );

  public login = async (
    email: string,
    code: string,
  ): Promise<LoginResponse> => {
    const response = await this.http.post<LoginResponse>(
      {
        path: '/oauth/email/login',
        body: JSON.stringify({ email, code, device: 'android' }),
      },
      LoginSchema,
    );

    this.http.authorization = response.data.accessToken;
    this._account = {
      ...response.data.user,
      accessToken: response.data.accessToken,
    };

    return response;
  };

  public authorize = async (token: string): Promise<ShortAccountInfo> => {
    this.http.authorization = token;
    this._account = extractAccountInfo(token);

    return this._account;
  };
}
