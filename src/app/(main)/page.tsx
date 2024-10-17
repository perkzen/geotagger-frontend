import { Metadata } from 'next';
import HomePage from '@/components/containers/home/home-page';
import { sessionQueryOptions } from '@/lib/api/auth/hooks';
import { getQueryClient } from '@/lib/utils/get-query-client';

export const metadata: Metadata = {
  title: 'Geotagger | Home',
};

export default function Page() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(sessionQueryOptions);

  return <HomePage />;
}
