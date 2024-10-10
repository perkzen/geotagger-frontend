import { env } from '@/env';

export const isDev = () => env.NEXT_PUBLIC_ENVIRONMENT === 'development';
export const isProd = () => env.NEXT_PUBLIC_ENVIRONMENT === 'production';
