import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Providers from '@/components/providers/providers';
import { getLocale } from 'next-intl/server';
import TranslationsProvider from '@/components/providers/translations-provider';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './globals.css';

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
