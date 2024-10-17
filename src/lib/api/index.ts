import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { getCookie } from 'cookies-next';
import { env } from '@/env';
import { refreshAccessToken, signOut } from '@/lib/api/auth';
import { NextAuthRoutes } from '@/lib/constants/api-routes';
import { ACCESS_TOKEN_COOKIE_NAME } from '@/lib/constants/cookies';

const isServer = typeof window === 'undefined';

const refreshTokenInterceptor = async (
  instance: AxiosInstance,
  error: AxiosError
) => {
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

const accessTokenInterceptor = async (config: InternalAxiosRequestConfig) => {
  let accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME);

  if (isServer) {
    const { cookies } = await import('next/headers');
    accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  }

  if (accessToken) {
    config.headers!.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const defaultApiConfig = {
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const api = axios.create(defaultApiConfig);

api.interceptors.request.use(accessTokenInterceptor);

api.interceptors.response.use(
  (response) => response,
  (error) => refreshTokenInterceptor(api, error)
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
  (error) => refreshTokenInterceptor(nextAuthApi, error)
);
