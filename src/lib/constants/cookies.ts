import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { isProd } from '@/lib/utils/env-check';

const COOKIE_PREFIX = '__geotagger';

export const ACCESS_TOKEN_COOKIE_NAME = `${COOKIE_PREFIX}_access_token`;
export const REFRESH_TOKEN_COOKIE_NAME = `${COOKIE_PREFIX}_refresh_token`;

export const FIFTEEN_MINUTES = 1000 * 60 * 15;
export const ONE_DAY = 1000 * 60 * 60 * 24;
export const ONE_MONTH = ONE_DAY * 30;

export const cookieOptions: Partial<ResponseCookie> = {
  httpOnly: true,
  sameSite: 'strict',
  secure: isProd(),
  path: '/',
  maxAge: FIFTEEN_MINUTES,
};
