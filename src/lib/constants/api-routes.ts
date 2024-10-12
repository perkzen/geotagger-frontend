import { env } from '@/env';

export const ApiRoutes = {
  auth: {
    google: (redirect: string) =>
      `${env.NEXT_PUBLIC_API_URL}/auth/google?redirect=${encodeURIComponent(redirect)}`,
    facebook: (redirect: string) =>
      `${env.NEXT_PUBLIC_API_URL}/auth/facebook?redirect=${encodeURIComponent(redirect)}`,
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh-token',
  },
  profile: {
    base: '/profile',
    image: '/profile/image',
  },
} as const;

export const NextAuthRoutes = {
  login: '/login',
  logout: '/logout',
  refreshToken: '/refresh-token',
  authCallback: '/callback',
  session: '/session',
} as const;
