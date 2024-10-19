import { isServer } from '@tanstack/react-query';
import axios, {
  AxiosError,
  AxiosInstance,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';
import { env } from '@/env';
import { refreshAccessToken, signOut } from '@/lib/api/auth';
import { useSessionStore } from '@/lib/stores/session-store';
import {
  getClientAccessToken,
  getServerAccessToken,
} from '@/lib/utils/access-token';

const handleSignOut = async () => {
  await signOut();

  if (!isServer) {
    useSessionStore.getState().clearSession();
  }
};

const refreshTokenInterceptor = async (
  instance: AxiosInstance,
  error: AxiosError
) => {
  const originalConfig = error.config as InternalAxiosRequestConfig & {
    isRefreshing?: boolean;
  };

  if (error.response?.status === 401 && !originalConfig.isRefreshing) {
    originalConfig.isRefreshing = true;

    try {
      const tokens = await refreshAccessToken();

      if (!isServer) {
        const { updateTokens } = useSessionStore.getState();
        updateTokens(tokens);
      }

      return instance(originalConfig);
    } catch (_e) {
      await handleSignOut();
    }
  }

  return Promise.reject(error);
};

const accessTokenInterceptor = async (config: InternalAxiosRequestConfig) => {
  const accessToken = await (isServer
    ? getServerAccessToken()
    : getClientAccessToken());

  if (accessToken) {
    config.headers!.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const defaultApiConfig: CreateAxiosDefaults = {
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

const defaultNextAuthApiConfig: CreateAxiosDefaults = {
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const nextAuthApi = axios.create(defaultNextAuthApiConfig);
