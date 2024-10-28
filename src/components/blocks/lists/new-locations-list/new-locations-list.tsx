'use client';
import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import LocationsList from '@/components/blocks/lists/locations-list/locations-list';
import { locationsListQueryOptions } from '@/lib/api/locations/hooks';
import { useQueryParams } from '@/lib/hooks/use-query-params';
import styles from './new-locations-list.module.scss';

const NewLocationsList = () => {
  const t = useTranslations();
  const { urlQuery } = useQueryParams();

  const { data } = useSuspenseQuery(
    locationsListQueryOptions(urlQuery.location)
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Typography variant="h4" color="primary">
          {t('home.newLocations')}
        </Typography>
        <Typography variant="body1">
          {t('home.newLocationsDescription')}
        </Typography>
      </div>
      <LocationsList
        paginatedData={data}
        itemProps={{ size: 'lg', as: 'link' }}
      />
    </div>
  );
};

export default NewLocationsList;
