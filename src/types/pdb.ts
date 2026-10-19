export type Config = {
  enableLogging?: boolean;
};

export type ShortAccountInfo = {
  id: string;
  username: string;
  accessToken: string;
};

export type SearchBoardBuilder = {
  query: string;
  nextCursor?: string;
  limit?: number;
};
