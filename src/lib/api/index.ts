import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { env } from '@/env';
import { refreshAccessToken, signOut } from '@/lib/api/auth';

export const nextAuthApi = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const defaultConfig = {
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const api = axios.create(defaultConfig);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig: AxiosRequestConfig & { retryAttempted?: boolean } =
      error.config || defaultConfig;

    if (error.response?.status === 401) {
      // don't redirect if the error is due to invalid credentials because the user is already on the sign-in page
      if (
        (error.response.data as { code: string }).code === 'INVALID_CREDENTIALS'
      ) {
        return Promise.reject(error);
      }

      if (!originalConfig.retryAttempted) {
        originalConfig.retryAttempted = true;

        try {
          await refreshAccessToken();
          return api(originalConfig);
        } catch (_e) {
          await signOut();
        }
      } else {
        await signOut();
      }
    }

    return Promise.reject(error);
  }
);
