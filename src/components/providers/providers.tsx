'use client';
import { ReactNode } from 'react';
import { AppProgressBar} from 'next-nprogress-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import ActivityLogger from '@/components/providers/activity-logger';
import ModalProvider from '@/components/providers/modal-provider';
import SessionProvider from '@/components/providers/session-provider';
import ThemeProvider from '@/components/providers/theme-provider';
import { Session } from '@/lib/types/session';
import { getQueryClient } from '@/lib/utils/get-query-client';
import vars from "@/styles/variables.module.scss"


type ProvidersProps = {
  session: Session | null;
  children: ReactNode;
};

export default function Providers({ children, session }: ProvidersProps) {
  const queryClient = getQueryClient();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ReactQueryStreamedHydration>
          <ActivityLogger>
            <ThemeProvider>
              <ModalProvider>
                <AppProgressBar
                  height="4px"
                  color={vars.primary}
                  shallowRouting
                  options={{ showSpinner: false }}
                />
                {children}
              </ModalProvider>
            </ThemeProvider>
          </ActivityLogger>
        </ReactQueryStreamedHydration>
      </QueryClientProvider>
    </SessionProvider>
  );
}
