export const Routes = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  LOCATION: '/location',
  ADD_LOCATION: '/location/add',
  EDIT_LOCATION: '/location/edit',
  FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
} as const;

export type Route = (typeof Routes)[keyof typeof Routes];
