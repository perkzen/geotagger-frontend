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
  login: '/login',
  logout: '/logout',
  refreshToken: '/refresh-token',
  authCallback: '/callback',
  session: '/session',
} as const;
