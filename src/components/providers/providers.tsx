'use client';
import { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import ModalProvider from '@/components/providers/modal-provider';
import SessionProvider from '@/components/providers/session-provider';
import ThemeProvider from '@/components/providers/theme-provider';
import { getQueryClient } from '@/lib/utils/get-query-client';
import {Session} from "@/lib/types/session";

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
          <ThemeProvider>
            <ModalProvider>{children}</ModalProvider>
          </ThemeProvider>
        </ReactQueryStreamedHydration>
      </QueryClientProvider>
    </SessionProvider>
  );
}
