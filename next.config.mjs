import createNextIntlPlugin from 'next-intl/plugin';
import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/env');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '"geotagger-bucket.s3.eu-central-1.amazonaws.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/auth/session',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
