import type { Headers } from './types/http';

export const BASE_URL = 'https://api.personality-database.com/api/v2';

export const BASE_HEADERS: Headers = {
  'Accept-Encoding': 'gzip',
  Connection: 'Keep-Alive',
  Host: 'api.personality-database.com',
  'User-Agent': 'Sosi',
  'X-Lang': 'en',
  'X-Locale': 'en',
  'X-Region': 'US',
  'X-Regions': '["US", "", ""]',
  'X-TZ-Database-Name': 'Europe/Moscow',
  'Content-Type': 'application/json',
};
