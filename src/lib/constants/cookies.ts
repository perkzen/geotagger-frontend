import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const COOKIE_PREFIX = '__geotagger';

export const SESSION_COOKIE_NAME = `${COOKIE_PREFIX}_session`;

export const ONE_DAY = 1000 * 60 * 60 * 24;
export const ONE_WEEK = ONE_DAY * 7;

const expiresAt = new Date(Date.now() + ONE_WEEK);

export const cookieOptions: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: true,
  expires: expiresAt,
  sameSite: 'lax',
  path: '/',
};
