import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@/styles/globals.scss';
import Providers from '@/components/providers/providers';
import TranslationsProvider from '@/components/providers/translations-provider';

export const metadata: Metadata = {
  title: 'Geotagger',
  description:
    'Web application for geotagging photos and sharing them with friends.',
  icons: {
    icon: [
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'Geotagger',
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        {/* TranslationProvider cannot be a child of a client component 
        (therefore we cant have it in providers.tsx) */}
        <TranslationsProvider>
          <Providers>{children}</Providers>
        </TranslationsProvider>
      </body>
    </html>
  );
}
