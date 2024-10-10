import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { isProd } from '@/lib/utils/env-check';

const COOKIE_PREFIX = '__geotagger';

export const ACCESS_TOKEN_COOKIE_NAME = `${COOKIE_PREFIX}_access_token`;
export const REFRESH_TOKEN_COOKIE_NAME = `${COOKIE_PREFIX}_refresh_token`;

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

export const cookieOptions: Partial<ResponseCookie> = {
  httpOnly: true,
  sameSite: 'strict',
  secure: isProd(),
  path: '/',
  maxAge: ONE_WEEK,
};
