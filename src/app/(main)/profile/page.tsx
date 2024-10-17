import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ProfilePage from '@/components/containers/profile/profile-page';
import { myLocationsQueryOptions } from '@/lib/api/locations/hooks';
import { profileQueryOptions } from '@/lib/api/profile/hooks';
import { DEFAULT_PAGINATION_QUERY } from '@/lib/constants/pagination';
import { PaginationQuery } from '@/lib/types/pagination';
import { getQueryClient } from '@/lib/utils/get-query-client';

export const metadata: Metadata = {
  title: 'Geotagger | Profile',
};

export default function Page({
  searchParams,
}: {
  searchParams: Partial<PaginationQuery>;
}) {
  const queryClient = getQueryClient();

  const query = { ...DEFAULT_PAGINATION_QUERY, ...searchParams };

  void Promise.all([
    queryClient.prefetchQuery(profileQueryOptions),
    queryClient.prefetchQuery(myLocationsQueryOptions(query)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfilePage />
    </HydrationBoundary>
  );
}
