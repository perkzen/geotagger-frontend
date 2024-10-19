import axios, {
  AxiosError,
  AxiosInstance,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';
import { env } from '@/env';
import { refreshAccessToken, signOut } from '@/lib/api/auth';
import { getSession } from '@/lib/server/auth/actions';
import { useSessionStore } from '@/lib/stores/session-store';

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
    !originalConfig?.url?.includes('auth/refresh-token') &&
    !originalConfig?.url?.includes('auth/login')
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
  let accessToken: string | undefined;

  if (isServer) {
    const session = await getSession();
    accessToken = session?.accessToken;
  } else {
    accessToken = useSessionStore.getState().session?.accessToken;
  }

  if (accessToken) {
    config.headers!.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};
const defaultApiConfig: CreateAxiosDefaults = {
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
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

const defaultNextAuthApiConfig: CreateAxiosDefaults = {
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const nextAuthApi = axios.create(defaultNextAuthApiConfig);

nextAuthApi.interceptors.request.use(accessTokenInterceptor);
//
// nextAuthApi.interceptors.response.use(
//   (response) => response,
//   (error) => refreshTokenInterceptor(nextAuthApi, error)
// );
