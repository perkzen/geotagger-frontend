import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ACCESS_TOKEN_COOKIE_NAME } from '@/lib/constants/cookies';
import { Routes } from '@/lib/constants/routes';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    const redirectUrl = new URL(Routes.SIGN_IN, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/location/:path*'],
};
