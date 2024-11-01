import { useTranslations } from 'next-intl';
import { AxiosError } from 'axios';
import { AuthErrorCodes } from '@/lib/api/auth/models';
import { ApiError } from '@/lib/types/api-error';

type UseErrorOptions = {
  defaultErrorMessage?: string;
};

export const useError = (options?: UseErrorOptions) => {
  const t = useTranslations('errors');

  const getAuthError = (error: AxiosError<ApiError>) => {
    const code = error.response?.data.code;

    switch (code) {
      case AuthErrorCodes.INVALID_CREDENTIALS:
        return t('invalidCredentials');
      case AuthErrorCodes.USER_ALREADY_EXISTS:
        return t('emailAlreadyInUse');
      case AuthErrorCodes.INCORRECT_PASSWORD:
        return t('incorrectPassword');
      default:
        return null;
    }
  };


  const getError = (error: AxiosError<ApiError>) => {
    const authError = getAuthError(error);

    if (authError) {
      return authError;
    }


    const response =
      error.response?.data.error ??
      options?.defaultErrorMessage ??
      t('default');

    return Array.isArray(response) ? response[0] : response;
  };

  return { getError };
};
