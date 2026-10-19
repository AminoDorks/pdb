import { randomUUID } from 'crypto';
import { fetch } from 'netbun';
import type { ZodType } from 'zod';
import type { Logger } from 'pino';

import { BASE_HEADERS, BASE_URL } from '../constants';
import { PDBError } from '../util/errors';
import type {
  BodyCallBuilder,
  HandleBuilder,
  Headers,
  PostPutBuilder,
} from '../types/http';

export class Http {
  private headers: Headers = { ...BASE_HEADERS };
  private _proxy?: string;

  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
    this.headers['X-Device'] =
      `sosi eblan razrab ya rezal mamok vashih${randomUUID()}`;
  }

  get proxy(): string | undefined {
    return this._proxy;
  }

  set proxy(value: string | undefined) {
    this._proxy = value;
    this.logger.info({ proxy: value }, 'proxy set');
  }

  set authorization(value: string) {
    this.headers['Authorization'] = `Bearer ${value}`;
  }

  private buildHeaders = (): Headers => {
    return {
      ...this.headers,
      'X-Request-ID': randomUUID(),
    };
  };

  private handle = async <T>(
    { path, response }: HandleBuilder,
    schema: ZodType<T>,
  ): Promise<T> => {
    if (response.status != 200) {
      this.logger.error({ path }, response.statusText);
      throw new PDBError(response.statusText);
    }

    this.logger.info({ path }, response.statusText);

    return schema.parse(await response.json());
  };

  private bodyCall = async <T>(
    { path, body, method }: BodyCallBuilder,
    schema: ZodType<T>,
  ): Promise<T> =>
    await this.handle(
      {
        path,
        response: await fetch(`${BASE_URL}${path}`, {
          method,
          body,
          headers: this.buildHeaders(),
          proxy: this.proxy,
        }),
      },
      schema,
    );

  public get = async <T>(path: string, schema: ZodType<T>): Promise<T> =>
    await this.handle(
      {
        path,
        response: await fetch(`${BASE_URL}${path}`, {
          method: 'GET',
          headers: this.buildHeaders(),
          proxy: this.proxy,
        }),
      },
      schema,
    );

  public post = async <T>(builder: PostPutBuilder, schema: ZodType<T>) =>
    await this.bodyCall<T>({ ...builder, method: 'POST' }, schema);

  public put = async <T>(builder: PostPutBuilder, schema: ZodType<T>) =>
    await this.bodyCall<T>({ ...builder, method: 'PUT' }, schema);

  public healthcheck = async (): Promise<boolean> => {
    try {
      await fetch('https://api.ipify.org?format=json', {
        method: 'GET',
        proxy: this._proxy,
      });

      return true;
    } catch {
      return false;
    }
  };
}
