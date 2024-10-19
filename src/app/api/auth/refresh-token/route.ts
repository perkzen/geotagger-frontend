import { AxiosError } from 'axios';
import { api } from '@/lib/api';
import { AccessTokens } from '@/lib/api/auth/models';
import { ApiRoutes } from '@/lib/constants/api-routes';
import { NextAuthErrorCodes } from '@/lib/constants/next-auth-error-codes';
import { getSession, updateTokens } from '@/lib/server/auth/actions';
import { NextAuthError } from '@/lib/types/next-auth-error';

export async function POST() {
  try {
    const session = await getSession();

    if (!session) {
      throw new NextAuthError(
        'Session not found',
        NextAuthErrorCodes.UNAUTHORIZED,
        401
      );
    }

    const { data: tokens } = await api.post<AccessTokens>(
      ApiRoutes.auth.refreshToken,
      {
        refreshToken: session.refreshToken,
      }
    );

    await updateTokens(tokens);

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
