import { AxiosError } from 'axios';
import { api } from '@/lib/api';
import { AccessTokens, User } from '@/lib/api/auth/models';
import { ApiRoutes } from '@/lib/constants/api-routes';
import { createSession } from '@/lib/server/session';
import { Session } from '@/lib/types/session';
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

    const { refreshToken, accessToken } = tokens;

    // we need to set headers manually because session is still not created
    const { data: user } = await api.get<User>('/auth/session', {
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
