export const Routes = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  ADD_LOCATION: '/location/add',
  PROFILE: '/profile',
} as const;

export type Route = (typeof Routes)[keyof typeof Routes];
