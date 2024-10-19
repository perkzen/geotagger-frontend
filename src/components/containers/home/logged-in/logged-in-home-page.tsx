import { Suspense } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import NewLocationsList from '@/components/blocks/lists/new-locations-list/new-locations-list';
import PersonalBestGuessesList from '@/components/blocks/lists/personal-best-guesses-list/personal-best-guesses-list';
import { locationsListQueryOptions } from '@/lib/api/locations/hooks';
import { getQueryClient } from '@/lib/utils/get-query-client';
import styles from './logged-in-home-page.module.scss';

export default function LoggedInHomePage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    locationsListQueryOptions({ take: 10, skip: 0 })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles.container}>
        <PersonalBestGuessesList />
        <Suspense fallback={'loading...'}>
          <NewLocationsList />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}
