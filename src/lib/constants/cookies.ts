import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { isProd } from '@/lib/utils/env-check';

const COOKIE_PREFIX = '__geotagger';

export const SESSION_COOKIE_NAME = `${COOKIE_PREFIX}_session`;

export const ONE_DAY = 1000 * 60 * 60 * 24;
export const ONE_WEEK = ONE_DAY * 7;

export const cookieOptions: Partial<ResponseCookie> = {
  httpOnly: true,
  sameSite: 'strict',
  secure: isProd(),
  path: '/',
  expires: new Date(Date.now() + ONE_WEEK),
};