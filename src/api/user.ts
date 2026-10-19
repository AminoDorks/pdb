import { type CommonResponse, CommonSchema } from '../dto/common';
import { type GetUserResponse, GetUserSchema } from '../dto/user';
import type { Http } from '../client/http';
import type { User } from '../entities/index';
import type { ShortAccountInfo } from '../types/pdb';

export class UserAPI {
  private http: Http;
  private account: ShortAccountInfo;

  constructor(http: Http, account: ShortAccountInfo) {
    this.http = http;
    this.account = account;
  }

  public get = async (userId?: string): Promise<User> =>
    (
      await this.http.get<GetUserResponse>(
        `/users/${userId || this.account.id}`,
        GetUserSchema,
      )
    ).data.user;

  public bio = async (bio: string): Promise<CommonResponse> =>
    await this.http.put<CommonResponse>(
      { path: `/users/${this.account.id}/bio`, body: JSON.stringify({ bio }) },
      CommonSchema,
    );

  public follow = async (userId: string): Promise<CommonResponse> =>
    await this.http.put<CommonResponse>(
      {
        path: `/users/${this.account.id}/following`,
        body: JSON.stringify({ userId }),
      },
      CommonSchema,
    );

  public birthYear = async (birthDate: string) =>
    await this.http.put<CommonResponse>(
      {
        path: `/users/${this.account.id}/birthYear`,
        body: JSON.stringify({ birthDate, confirmed: false }),
      },
      CommonSchema,
    );
}
