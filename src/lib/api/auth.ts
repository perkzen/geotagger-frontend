import { env } from '@/env';
import { api, nextAuthApi } from '@/lib/api/index';
import { ApiRoutes, NextAuthRoutes } from '@/lib/constants/api-routes';
import { Session } from '@/lib/models/auth';
import { ChangePasswordFormData } from '@/lib/validators/change-password';
import { SignInFormData } from '@/lib/validators/sign-in';
import { SignUpFormData } from '@/lib/validators/sign-up';

const redirectUrl = `${env.NEXT_PUBLIC_AUTH_URL}${NextAuthRoutes.authCallback}`;

export const signInWithGoogle = () => {
  window.open(ApiRoutes.auth.google(redirectUrl), '_self');
};

export const signInWithFacebook = () => {
  window.open(ApiRoutes.auth.facebook(redirectUrl), '_self');
};

export const signUp = async (data: SignUpFormData) => {
  await api.post(ApiRoutes.auth.register, data);
};

export const signIn = async (data: SignInFormData) => {
  await nextAuthApi.post(NextAuthRoutes.login, data);
};

export const signOut = async () => {
  await nextAuthApi.post(NextAuthRoutes.logout);
};

export const refreshAccessToken = async () => {
  await nextAuthApi.post(NextAuthRoutes.refreshToken);
};

export const getSession = async () => {
  const res = await nextAuthApi.get<Session>(NextAuthRoutes.session);
  return res.data;
};

export const changePassword = async (data: ChangePasswordFormData) => {
  await api.patch(ApiRoutes.auth.changePassword, data);
};
