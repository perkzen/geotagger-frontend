import { env } from '@/env';
import { PaginationQuery } from '@/lib/types/pagination';

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
    changePassword: '/auth/change-password',
  },
  profile: {
    base: '/profile',
    image: '/profile/image',
  },
  locations: {
    geocode: ({ lat, lng }: { lat: number; lng: number }) =>
      `/locations/geocode?lat=${lat}&lng=${lng}`,
    add: '/locations',
    myLocations: ({ take, skip }: PaginationQuery) =>
      `/locations/me?take=${take}&skip=${skip}`,
    byId: (id: string) => `/locations/${id}`,
  },
} as const;

export const NextAuthRoutes = {
  login: '/login',
  logout: '/logout',
  refreshToken: '/refresh-token',
  authCallback: '/callback',
  session: '/session',
} as const;
