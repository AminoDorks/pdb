export type Headers = Record<string, string>;

export type HandleBuilder = {
  path: string;
  response: Response;
};

export type PostPutBuilder = {
  path: string;
  body: string;
};

export type BodyCallBuilder = PostPutBuilder & {
  method: 'POST' | 'PUT';
};
