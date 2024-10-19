import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Routes } from '@/lib/constants/routes';
import { getSession } from '@/lib/server/session';

const protectedRoutes = [
  Routes.ADD_LOCATION,
  Routes.EDIT_LOCATION,
  Routes.PROFILE,
];

export async function middleware(req: NextRequest) {
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const session = await getSession();

    if (!session?.user) {
      const redirectUrl = new URL(Routes.SIGN_IN, req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
