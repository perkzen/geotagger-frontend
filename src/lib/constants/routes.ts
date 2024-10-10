export const Routes = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
} as const;

export type Route = (typeof Routes)[keyof typeof Routes];
