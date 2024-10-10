import { AxiosError } from 'axios';
import { api } from '@/lib/api';
import { ApiRoutes } from '@/lib/constants/api-routes';
import { AccessTokens } from '@/lib/models/auth';
import { setAuthCookies } from '@/lib/server/auth';

export async function POST() {
  try {
    const { data } = await api.post<AccessTokens>(ApiRoutes.auth.refreshToken);

    const { accessToken, refreshToken } = data;

    setAuthCookies({ accessToken, refreshToken });

    return new Response(undefined, {
      status: 200,
    });
  } catch (e: unknown) {
    const error = e as AxiosError;

    const status = error.status;

    return Response.json(error.response?.data, {
      status,
    });
  }
}
