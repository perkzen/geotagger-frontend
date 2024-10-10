import { AxiosError } from 'axios';
import { api } from '@/lib/api';
import { ApiRoutes } from '@/lib/constants/api-routes';
import { AccessTokens } from '@/lib/models/auth';
import { setAuthCookies } from '@/lib/server/auth';
import { SignInValidator } from '@/lib/validators/sign-in';

export async function POST(req: Request) {
  const body = await req.json();

  const { success, data, error } = SignInValidator.safeParse(body);

  if (!success) {
    return Response.json(
      {
        error: error?.flatten().fieldErrors,
      },
      {
        status: 400,
      }
    );
  }

  try {
    const { data: tokens } = await api.post<AccessTokens>(
      ApiRoutes.auth.login,
      data
    );
    const { accessToken, refreshToken } = tokens;

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
