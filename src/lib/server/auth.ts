import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { env } from '@/env';
import { AccessTokens, Session, SessionUser } from '@/lib/api/auth/models';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  cookieOptions,
  ONE_MONTH,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/lib/constants/cookies';
import { NextAuthError, NextAuthErrorCodes } from '@/lib/types/next-auth-error';

export const setAuthCookies = ({
  accessToken,
  refreshToken,
}: AccessTokens): void => {
  cookies().set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    ...cookieOptions,
    httpOnly: false,
  });
  cookies().set(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    ...cookieOptions,
    maxAge: ONE_MONTH,
  });
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

export const getServerSession = async (): Promise<Session> => {
  try {
    const { accessToken } = getAccessTokens();

    const secret = new TextEncoder().encode(env.JWT_SECRET);

    const { payload } = await jwtVerify(accessToken, secret);

    return {
      session: true,
      user: payload.sub as unknown as SessionUser,
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
