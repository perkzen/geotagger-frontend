import { AxiosError } from 'axios';

export type ApiError = {
  statusCode: number;
  code: string;
  error: string | string[];
};

export const createApiError = (
  error: AxiosError,
  data: ApiError
): AxiosError<ApiError> => {
  return {
    ...error,
    response: {
      ...error.response,
      data: data,
    },
  } as AxiosError<ApiError>;
};
