import type { Metadata } from 'next';
import EditLocationPage from '@/components/containers/edit-location/edit-location-page';
import { locationQueryOptions } from '@/lib/api/locations/hooks';
import { getQueryClient } from '@/lib/utils/get-query-client';

export const metadata: Metadata = {
  title: 'Geotagger | Edit Location',
};

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(locationQueryOptions(id));

  return <EditLocationPage id={id} />;
}
