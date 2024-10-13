export const Routes = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  location: {
    add: '/location/add',
  },
  profile: '/profile',
} as const;

export type Route = (typeof Routes)[keyof typeof Routes];
