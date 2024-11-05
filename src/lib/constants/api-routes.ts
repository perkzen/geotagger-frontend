import { env } from '@/env';
import { Coordinates } from '@/lib/types/coordinates';
import { PaginationQuery } from '@/lib/types/pagination';

export const ApiRoutes = {
  auth: {
    google: (redirect: string) =>
      `${env.NEXT_PUBLIC_API_URL}/auth/google?redirect=${encodeURIComponent(redirect)}`,
    facebook: (redirect: string) =>
      `${env.NEXT_PUBLIC_API_URL}/auth/facebook?redirect=${encodeURIComponent(redirect)}`,
    login: '/auth/login',
    register: '/auth/register',
    session: '/auth/session',
    refreshToken: '/auth/refresh-token',
    changePassword: '/auth/change-password',
    forgotPassword: '/auth/reset-password',
    resetPassword: (token: string) => `/auth/reset-password/${token}`,
  },
  profile: {
    base: '/profile',
    image: '/profile/image',
  },
  locations: {
    list: ({ take, skip }: PaginationQuery) =>
      `/locations?take=${take}&skip=${skip}`,
    geocode: ({ lat, lng }: Coordinates) =>
      `/locations/geocode?lat=${lat}&lng=${lng}`,
    add: '/locations',
    myLocations: ({ take, skip }: PaginationQuery) =>
      `/locations/me?take=${take}&skip=${skip}`,
    byId: (id: string) => `/locations/${id}`,
    guess: (id: string) => `/locations/guess/${id}`,
    bestScores: ({ take, skip }: PaginationQuery) =>
      `/locations/me/best-scores?take=${take}&skip=${skip}`,
  },
  activityLogs: {
    base: '/activity-logs',
    list: ({ take, skip }: PaginationQuery) =>
      `/activity-logs?take=${take}&skip=${skip}`,
  },
  media: {
    upload: '/media/upload',
  },
} as const;

export const NextAuthRoutes = {
  login: '/login',
  logout: '/logout',
  refreshToken: '/refresh-token',
  authCallback: '/callback',
  session: '/session',
} as const;
