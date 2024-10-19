import { env } from '@/env';
import { api, nextAuthApi } from '@/lib/api';
import { AccessTokens, User } from '@/lib/api/auth/models';
import { ApiRoutes, NextAuthRoutes } from '@/lib/constants/api-routes';
import { Session } from '@/lib/types/session';
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

export const getSession = async () => {
  const res = await api.get<User>(ApiRoutes.auth.session);
  return res.data;
};

export const changePassword = async (data: ChangePasswordFormData) => {
  await api.patch(ApiRoutes.auth.changePassword, data);
};

/**
 *
 * NextAuth API
 *
 */

export const signIn = async (data: SignInFormData) => {
  const res = await nextAuthApi.post<Session>(NextAuthRoutes.login, data);
  return res.data;
};

export const signOut = async () => {
  await nextAuthApi.get(NextAuthRoutes.logout);
};

export const refreshAccessToken = async () => {
  const res = await nextAuthApi.post<AccessTokens>(NextAuthRoutes.refreshToken);
  return res.data;
};

export const getAccessTokenFromSession = async (token: string) => {
  const { data } = await nextAuthApi.get<Session>(NextAuthRoutes.session, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.accessToken;
};
