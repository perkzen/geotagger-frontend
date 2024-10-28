import LocationPage from '@/components/containers/location/location-page';
import { locationQueryOptions } from '@/lib/api/locations/hooks';
import { getQueryClient } from '@/lib/utils/get-query-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(locationQueryOptions(id));

  return <LocationPage id={id} />;
}
