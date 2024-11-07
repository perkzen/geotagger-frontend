import { type NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api';
import { User } from '@/lib/api/auth/models';
import { ApiRoutes } from '@/lib/constants/api-routes';
import { Routes } from '@/lib/constants/routes';
import { createSession } from '@/lib/server/session';
import { Session } from '@/lib/types/session';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');

  console.log(req.url)

  if (accessToken && refreshToken) {
    try {
      // we need to set headers manually because session is still not created
      const { data } = await api.get<User>(ApiRoutes.auth.session, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const payload: Session = {
        user: data,
        accessToken,
        refreshToken,
      };

      await createSession(payload);

      return NextResponse.redirect(new URL(Routes.HOME, req.nextUrl.origin));
    } catch (_e) {
      return NextResponse.redirect(new URL(Routes.SIGN_IN, req.nextUrl.origin));
    }
  }

  return NextResponse.redirect(new URL(Routes.SIGN_IN, req.nextUrl.origin));
}
