'use client';
import { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import ActivityLogger from '@/components/providers/activity-logger';
import ModalProvider from '@/components/providers/modal-provider';
import ProgressBarProvider from '@/components/providers/pogress-bar-provider';
import SessionProvider from '@/components/providers/session-provider';
import ThemeProvider from '@/components/providers/theme-provider';
import { Session } from '@/lib/types/session';
import { getQueryClient } from '@/lib/utils/get-query-client';

type ProvidersProps = {
  session: Session | null;
  userAgent: string;
  children: ReactNode;
};

export default function Providers({
  children,
  session,
  userAgent,
}: ProvidersProps) {
  const queryClient = getQueryClient();

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: false }}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ReactQueryStreamedHydration>
            <ActivityLogger>
              <ThemeProvider userAgent={userAgent}>
                <ModalProvider>
                  <ProgressBarProvider />
                  {children}
                </ModalProvider>
              </ThemeProvider>
            </ActivityLogger>
          </ReactQueryStreamedHydration>
        </QueryClientProvider>
      </SessionProvider>
    </AppRouterCacheProvider>
  );
}
