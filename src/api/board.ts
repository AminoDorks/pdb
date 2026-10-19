import { CommonSchema, type CommonResponse } from '../dto/common';
import {
  AnalysesProfileSchema,
  CreatePostSchema,
  DiscoveryProfilesSchema,
  GetBoardSchema,
  GetPostsSchema,
  SearchBoardSchema,
  type AnalysesProfileResponse,
  type CreatePostResponse,
  type DiscoveryProfilesResponse,
  type GetBoardResponse,
  type GetPostsResponse,
  type SearchBoardResponse,
} from '../dto/board';
import type { Http } from '../client/http';
import type { Board, Post } from '../entities/index';
import type { SearchBoardBuilder } from '../types/pdb';

export class BoardAPI {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public search = async ({
    query,
    nextCursor,
    limit,
  }: SearchBoardBuilder): Promise<SearchBoardResponse> =>
    await this.http.get<SearchBoardResponse>(
      `/search/boards?query=${encodeURIComponent(query)}&nextCursor=${nextCursor || 0}&limit=${limit || 10}`,
      SearchBoardSchema,
    );

  public get = async (boardId: string): Promise<Board> =>
    (
      await this.http.get<GetBoardResponse>(
        `/community/boards/${boardId}`,
        GetBoardSchema,
      )
    ).data.board;

  public join = async (boardId: string): Promise<CommonResponse> =>
    await this.http.post<CommonResponse>(
      {
        path: `/community/boards/${boardId}/join`,
        body: JSON.stringify({ message: 'sosite' }),
      },
      CommonSchema,
    );

  public post = async (
    boardId: string,
    title: string,
    content: string,
  ): Promise<Post> =>
    (
      await this.http.post<CreatePostResponse>(
        {
          path: `/community/boards/${boardId}/posts`,
          body: JSON.stringify({ title, content, images: [] }),
        },
        CreatePostSchema,
      )
    ).data.post;

  public posts = async (
    boardId: string,
    limit: number = 10,
  ): Promise<GetPostsResponse> =>
    await this.http.get<GetPostsResponse>(
      `/community/boards/${boardId}/posts?sort=new&range=all&limit=${limit}`,
      GetPostsSchema,
    );

  public discover = async (
    limit: number = 10,
  ): Promise<DiscoveryProfilesResponse> =>
    await this.http.get<DiscoveryProfilesResponse>(
      `/summary/discover_profiles?limit=${limit}&sort=top`,
      DiscoveryProfilesSchema,
    );

  public analyses = async (
    profileId: string,
    limit: number = 10,
  ): Promise<AnalysesProfileResponse> =>
    await this.http.get<AnalysesProfileResponse>(
      `/profiles/${profileId}/analyses?sort=new&range=all&limit=${limit}`,
      AnalysesProfileSchema,
    );

  public vote = async (
    profileId: string,
    postId: string,
    voteType: number = 1,
  ): Promise<CommonResponse> =>
    await this.http.post<CommonResponse>(
      {
        path: `/profiles/${profileId}/analyses/${postId}/votes`,
        body: JSON.stringify({ voteType }),
      },
      CommonSchema,
    );

  public reply = async (
    profileId: string,
    postId: string,
    comment: string,
  ): Promise<CommonResponse> =>
    await this.http.post<CommonResponse>(
      {
        path: `/profiles/${profileId}/analyses/${postId}/replies`,
        body: JSON.stringify({ comment }),
      },
      CommonSchema,
    );
}
