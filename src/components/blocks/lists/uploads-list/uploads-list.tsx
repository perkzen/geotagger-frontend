'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import LocationsList from '@/components/blocks/lists/locations-list/locations-list';
import EmptyUploadsList from '@/components/blocks/lists/uploads-list/empty-uploads-list/empty-uploads-list';
import { myLocationsQueryOptions } from '@/lib/api/locations/hooks';
import { useQueryParams } from '@/lib/hooks/use-query-params';

const UploadsList = () => {
  const { urlQuery } = useQueryParams();

  const { data } = useSuspenseQuery(myLocationsQueryOptions(urlQuery.location));

  return (
    <LocationsList
      data={data}
      emptyComponent={<EmptyUploadsList />}
      itemProps={{ allowEdit: true }}
    />
  );
};

export default UploadsList;
