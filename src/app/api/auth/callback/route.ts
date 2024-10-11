import { type NextRequest, NextResponse } from 'next/server';
import { Routes } from '@/lib/constants/routes';
import { setAuthCookies } from '@/lib/server/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');

  const redirectUrl = new URL(Routes.home, req.nextUrl.origin);
  const response = NextResponse.redirect(redirectUrl);

  if (accessToken && refreshToken) {
    setAuthCookies({ accessToken, refreshToken });
  }

  return response;
}
