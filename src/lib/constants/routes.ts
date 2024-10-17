export const Routes = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  ADD_LOCATION: '/location/add',
  PROFILE: '/profile',
  EDIT_LOCATION: '/location/edit',
} as const;

export type Route = (typeof Routes)[keyof typeof Routes];
