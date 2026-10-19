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
  'X-Device':
    'eyJPUyI6ImFuZHJvaWQiLCJBcHAtVmVyc2lvbiI6IjIuMTM0LjYiLCJBcHAtQnVpbGRObyI6IjI2OTQiLCJNYXJrZXQiOiJHb29nbGVQbGF5IiwiQnJhbmQiOiJ3YXlkcm9pZCIsIk1vZGVsIjoiV2F5RHJvaWQgeDg2XzY0IERldmljZSIsIkJ1bmRsZUlEIjoicGRiLmFwcCIsIk1hbnVmYWN0dXJlciI6IldheWRyb2lkIiwiT1MtVmVyc2lvbiI6IjEzIiwiU0RLLVZlcnNpb24iOiIzMyIsIlgtUERCLURldmljZS1JRCI6IjhkOWZjZDZkOGRiMDU1OTUiLCJUaWVyIjoiaGlnaCIsIlJhbSI6IjMxNzkxTUIiLCJDcHUiOiJ1bmtub3duIiwiQ2xpZW50IjoiUGRiLUNsYXNzaWMifQ==',
};
