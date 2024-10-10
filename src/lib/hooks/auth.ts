import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getSession, signIn, signOut, signUp } from '@/lib/api/auth';
import { Routes } from '@/lib/constants/routes';
import { ApiError } from '@/lib/models/api-error';
import { AuthErrorCodes } from '@/lib/models/auth';
import { getQueryClient } from '@/lib/utils/get-query-client';
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
      push(Routes.home);
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
    onSuccess: () => push(Routes.signIn),
  });
};

const SIGN_OUT_KEY = 'logout';

export const useSignOut = () => {
  const { push } = useRouter();
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: [SIGN_OUT_KEY],
    mutationFn: signOut,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [SESSION_KEY],
      });
      push(Routes.signIn);
    },
  });
};

export const useAuthError = () => {
  const t = useTranslations('errors');

  const getAuthError = (error: AxiosError<ApiError>) => {
    const code = error.response?.data.code;

    switch (code) {
      case AuthErrorCodes.INVALID_CREDENTIALS:
        return t('invalidCredentials');
      case AuthErrorCodes.USER_ALREADY_EXISTS:
        return t('emailAlreadyInUse');
      default:
        return t('default');
    }
  };

  return { getAuthError };
};
