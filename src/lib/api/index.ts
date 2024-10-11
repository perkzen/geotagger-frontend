import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { env } from '@/env';
import { refreshAccessToken, signOut } from '@/lib/api/auth';
import { NextAuthRoutes } from '@/lib/constants/api-routes';

const authInterceptor = async (instance: AxiosInstance, error: AxiosError) => {
  const originalConfig = error.config as InternalAxiosRequestConfig & {
    isRefreshing?: boolean;
  };

  if (
    error.response?.status === 401 &&
    !originalConfig?.url?.includes(NextAuthRoutes.login) &&
    !originalConfig?.url?.includes(NextAuthRoutes.refreshToken)
  ) {
    if (!originalConfig.isRefreshing) {
      originalConfig.isRefreshing = true;

      try {
        await refreshAccessToken();
        return instance(originalConfig);
      } catch (_e) {
        await signOut();
      }
    } else {
      await signOut();
    }
  }

  return Promise.reject(error);
};

const defaultApiConfig = {
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const api = axios.create(defaultApiConfig);

api.interceptors.response.use(
  (response) => response,
  (error) => authInterceptor(api, error)
);

const defaultNextAuthApiConfig: AxiosRequestConfig = {
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const nextAuthApi = axios.create(defaultNextAuthApiConfig);

nextAuthApi.interceptors.response.use(
  (response) => response,
  (error) => authInterceptor(nextAuthApi, error)
);
