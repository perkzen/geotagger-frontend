'use client';
import { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import ModalProvider from '@/components/providers/modal-provider';
import ThemeProvider from '@/components/providers/theme-provider';
import { getQueryClient } from '@/lib/utils/get-query-client';

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ReactQueryStreamedHydration>
        <ThemeProvider>
          <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
