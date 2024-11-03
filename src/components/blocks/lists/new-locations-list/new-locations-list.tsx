'use client';
import { useTranslations } from 'next-intl';
import { useSuspenseQuery } from '@tanstack/react-query';
import EmptyList from '@/components/blocks/empty-list/empty-list';
import LocationsList from '@/components/blocks/lists/locations-list/locations-list';
import { locationsListQueryOptions } from '@/lib/api/locations/hooks';
import { useQueryParams } from '@/lib/hooks/use-query-params';

const NewLocationsList = () => {
  const t = useTranslations();
  const { urlQuery } = useQueryParams();
  const { data } = useSuspenseQuery(
    locationsListQueryOptions(urlQuery.locations)
  );

  return (
    <LocationsList
      data={data}
      itemProps={{ size: 'lg', as: 'link' }}
      columns={4}
      emptyComponent={
        <EmptyList
          title={t('home.noLocations')}
          description={t('home.noLocationsDescription')}
        />
      }
    />
  );
};

export default NewLocationsList;
