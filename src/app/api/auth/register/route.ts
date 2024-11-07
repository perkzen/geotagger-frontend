import axios, { AxiosError } from 'axios';
import { env } from '@/env';
import { api } from '@/lib/api';
import { AccessTokens, User } from '@/lib/api/auth/models';
import { ApiRoutes } from '@/lib/constants/api-routes';
import { createSession } from '@/lib/server/session';
import { Session } from '@/lib/types/session';
import { SignUpValidator } from '@/lib/validators/sign-up';

export async function POST(req: Request) {
  const body = await req.json();

  const { success, data, error } = SignUpValidator.safeParse(body);

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
      ApiRoutes.auth.register,
      data
    );

    const { refreshToken, accessToken } = tokens;

    const { data: user } = await axios.get<User>(ApiRoutes.auth.session, {
      baseURL: env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const session: Session = {
      user,
      accessToken,
      refreshToken,
    };

    await createSession(session);

    return Response.json(session, {
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
