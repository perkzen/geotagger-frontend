import { AxiosError } from 'axios';
import { api } from '@/lib/api';
import { ApiRoutes } from '@/lib/constants/api-routes';
import { AccessTokens } from '@/lib/models/auth';
import { getAccessTokens, setAuthCookies } from '@/lib/server/auth';
import { NextAuthError } from '@/lib/server/errors/next-auth-error';

export async function POST() {
  try {
    const tokens = getAccessTokens();

    const { data } = await api.post<AccessTokens>(ApiRoutes.auth.refreshToken, {
      refreshToken: tokens.refreshToken,
    });

    const { accessToken, refreshToken } = data;

    setAuthCookies({ accessToken, refreshToken });

    return new Response(undefined, {
      status: 200,
    });
  } catch (e: unknown) {
    const error = e as AxiosError;

    if (error instanceof AxiosError) {
      return Response.json(error.response?.data, {
        status: error.status,
      });
    }

    if (e instanceof NextAuthError) {
      return Response.json(
        {
          message: e.message,
          status: e.status,
          code: e.code,
        },
        { status: e.status }
      );
    }

    return Response.json(
      {
        message: 'An unknown error occurred',
      },
      { status: 500 }
    );
  }
}
