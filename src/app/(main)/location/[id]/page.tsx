import { Suspense } from 'react';
import LocationNotFoundBoundary from '@/components/blocks/location-not-found-boundary/location-not-found-boundary';
import LocationPage from '@/components/containers/location/location-page';
import LocationPageSkeleton from '@/components/containers/location/location-page-skeleton';

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  return (
    <LocationNotFoundBoundary>
      <Suspense fallback={<LocationPageSkeleton />}>
        <LocationPage id={id} />
      </Suspense>
    </LocationNotFoundBoundary>
  );
}
