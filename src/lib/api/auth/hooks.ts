import { useRouter } from 'next/navigation';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  changePassword,
  getSession,
  signIn,
  signOut,
  signUp,
} from '@/lib/api/auth';
import { GET_PROFILE_KEY } from '@/lib/api/profile/hooks';
import { Routes } from '@/lib/constants/routes';
import { ApiError } from '@/lib/types/api-error';
import { getQueryClient } from '@/lib/utils/get-query-client';
import { ChangePasswordFormData } from '@/lib/validators/change-password';
import { SignInFormData } from '@/lib/validators/sign-in';
import { SignUpFormData } from '@/lib/validators/sign-up';

export const SESSION_KEY = 'session';

export const useSession = () => {
  const { data } = useQuery({
    queryKey: [SESSION_KEY],
    queryFn: getSession,
    refetchOnMount: true,
  });

  return data;
};

export const SIGN_IN_KEY = 'login';

export const useSignIn = () => {
  const { push } = useRouter();
  const queryClient = getQueryClient();

  return useMutation<void, AxiosError<ApiError>, SignInFormData>({
    mutationKey: [SIGN_IN_KEY],
    mutationFn: signIn,
    onSuccess: () => {
      push(Routes.HOME);
      void queryClient.invalidateQueries({
        queryKey: [SESSION_KEY],
      });
    },
  });
};

export const SIGN_UP_KEY = 'register';

export const useSignUp = () => {
  const { push } = useRouter();

  return useMutation<void, AxiosError<ApiError>, SignUpFormData>({
    mutationKey: [SIGN_UP_KEY],
    mutationFn: signUp,
    onSuccess: () => push(Routes.SIGN_IN),
  });
};

export const SIGN_OUT_KEY = 'logout';

export const useSignOut = () => {
  const { push } = useRouter();
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: [SIGN_OUT_KEY],
    mutationFn: signOut,
    onSuccess: () => {
      void Promise.all([
        queryClient.invalidateQueries({
          queryKey: [SESSION_KEY],
        }),
        queryClient.invalidateQueries({ queryKey: [GET_PROFILE_KEY] }),
      ]);

      push(Routes.SIGN_IN);
    },
  });
};

export const CHANGE_PASSWORD_KEY = 'change-password';

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
