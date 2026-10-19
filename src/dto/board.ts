import z from 'zod';

import { BoardSchema } from '../entities/board';
import { CommonSchema } from './common';
import { PostSchema } from '../entities/post';
import { ProfileSchema } from '../entities/profile';

export const SearchBoardSchema = z.object({
  data: z.object({
    count: z.number(),
    cursor: z.object({
      limit: z.number(),
      nextCursor: z.string(),
    }),
    results: z.array(BoardSchema),
  }),
  ...CommonSchema.shape,
});

export const GetBoardSchema = z.object({
  data: z.object({
    board: BoardSchema,
  }),
  ...CommonSchema.shape,
});

export const CreatePostSchema = z.object({
  data: z.object({
    post: PostSchema,
  }),
  ...CommonSchema.shape,
});

export const GetPostsSchema = z.object({
  data: z.object({
    cursor: z.object({
      limit: z.number(),
      nextCursor: z.string(),
    }),
    results: z.array(PostSchema),
  }),
});

export const DiscoveryProfilesSchema = z.object({
  data: z.object({
    cursor: z.object({
      limit: z.number(),
      nextCursor: z.string(),
    }),
    results: z.array(ProfileSchema),
  }),
  ...CommonSchema.shape,
});

export const AnalysesProfileSchema = z.object({
  data: z.object({
    cursor: z.object({
      limit: z.number(),
      nextCursor: z.string(),
    }),
    results: z.array(PostSchema),
  }),
  ...CommonSchema.shape,
});

export type SearchBoardResponse = z.infer<typeof SearchBoardSchema>;
export type GetBoardResponse = z.infer<typeof GetBoardSchema>;
export type CreatePostResponse = z.infer<typeof CreatePostSchema>;
export type GetPostsResponse = z.infer<typeof GetPostsSchema>;
export type DiscoveryProfilesResponse = z.infer<typeof DiscoveryProfilesSchema>;
export type AnalysesProfileResponse = z.infer<typeof AnalysesProfileSchema>;
