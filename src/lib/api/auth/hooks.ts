import {
  queryOptions,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  changePassword,
  getSession,
  signIn,
  signOut,
  signUp,
} from '@/lib/api/auth';
import { ApiError } from '@/lib/types/api-error';
import { ChangePasswordFormData } from '@/lib/validators/change-password';
import { SignInFormData } from '@/lib/validators/sign-in';
import { SignUpFormData } from '@/lib/validators/sign-up';

export const SESSION_KEY = 'SESSION';

export const sessionQueryOptions = queryOptions({
  queryKey: [SESSION_KEY],
  queryFn: getSession,
});

export const SIGN_IN_KEY = 'LOGIN';

type UseSignInOptions = Omit<
  UseMutationOptions<void, AxiosError<ApiError>, SignInFormData, unknown>,
  'mutationFn' | 'mutationKey'
>;

export const useSignIn = (options?: UseSignInOptions) => {
  return useMutation<void, AxiosError<ApiError>, SignInFormData>({
    ...options,
    mutationKey: [SIGN_IN_KEY],
    mutationFn: signIn,
  });
};

export const SIGN_UP_KEY = 'REGISTER';

type UseSignUpOptions = Omit<
  UseMutationOptions<void, AxiosError<ApiError>, SignUpFormData, unknown>,
  'mutationFn' | 'mutationKey'
>;

export const useSignUp = (options?: UseSignUpOptions) => {
  return useMutation<void, AxiosError<ApiError>, SignUpFormData>({
    ...options,
    mutationKey: [SIGN_UP_KEY],
    mutationFn: signUp,
  });
};

export const SIGN_OUT_KEY = 'LOGOUT';

type UseSignOutOptions = Omit<
  UseMutationOptions<void, Error, void, unknown>,
  'mutationFn' | 'mutationKey'
>;

export const useSignOut = (options?: UseSignOutOptions) => {
  return useMutation({
    ...options,
    mutationKey: [SIGN_OUT_KEY],
    mutationFn: signOut,
  });
};

export const CHANGE_PASSWORD_KEY = 'CHANGE_PASSWORD';

export type UseChangePasswordOptions = Omit<
  UseMutationOptions<
    void,
    AxiosError<ApiError>,
    ChangePasswordFormData,
    unknown
  >,
  'mutationFn' | 'mutationKey'
>;

export const useChangePassword = (options?: UseChangePasswordOptions) => {
  return useMutation({
    ...options,
    mutationKey: [CHANGE_PASSWORD_KEY],
    mutationFn: changePassword,
  });
};
