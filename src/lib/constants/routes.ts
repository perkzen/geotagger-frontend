export const Routes = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  addLocation: '/location/add',
  profile: '/profile',
} as const;

export type Route = (typeof Routes)[keyof typeof Routes];
