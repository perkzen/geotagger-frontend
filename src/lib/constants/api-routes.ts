export const ApiRoutes = {
  auth: {
    google: '/auth/google?redirect=:redirect',
    facebook: '/auth/facebook?redirect=:redirect',
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh-token',
  },
  profile: '/profile',
} as const;

export const NextAuthRoutes = {
  login: '/api/auth/login',
  logout: '/api/auth/logout',
  refreshToken: '/api/auth/refreshToken',
  authCallback: '/api/auth/callback',
  session: '/api/auth/session',
} as const;
