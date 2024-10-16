import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { env } from '@/env';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  cookieOptions,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/lib/constants/cookies';
import { AccessTokens, Session, SessionUser } from '@/lib/api/auth/auth';
import { NextAuthError, NextAuthErrorCodes } from '@/lib/types/next-auth-error';

export const setAuthCookies = ({
  accessToken,
  refreshToken,
}: AccessTokens): void => {
  cookies().set(ACCESS_TOKEN_COOKIE_NAME, accessToken, cookieOptions);
  cookies().set(REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieOptions);
};

export const getAccessTokens = (): AccessTokens => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken || !refreshToken) {
    throw new NextAuthError(
      'Access token or refresh token not found',
      NextAuthErrorCodes.ACCESS_TOKEN_NOT_FOUND,
      401
    );
  }

  return { accessToken, refreshToken };
};

export const removeAuthCookies = (): void => {
  cookies().delete(ACCESS_TOKEN_COOKIE_NAME);
  cookies().delete(REFRESH_TOKEN_COOKIE_NAME);
};

export const getServerSession = (): Session => {
  try {
    const { accessToken } = getAccessTokens();

    const decoded = verify(accessToken, env.JWT_SECRET);

    return {
      session: true,
      user: decoded.sub as unknown as SessionUser,
      error: null,
    };
  } catch (e) {
    const error = e as Error;

    return {
      session: false,
      user: null,
      error: error.message,
    };
  }
};
