import type { Metadata } from 'next';
import Head from 'next/head';
import { ReactNode } from 'react';
import Providers from '@/components/providers/providers';
import { getLocale } from 'next-intl/server';
import TranslationsProvider from '@/components/providers/translations-provider';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Geotagger',
  description:
    'Web application for geotagging photos and sharing them with friends.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-48x48.png"
          sizes="48x48"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Geotagger" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
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
