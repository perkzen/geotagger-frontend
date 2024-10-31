'use client';
import { useTranslations } from 'next-intl';
import dynamic from "next/dynamic";
import { Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { locationsListQueryOptions } from '@/lib/api/locations/hooks';
import { useQueryParams } from '@/lib/hooks/use-query-params';
import styles from './new-locations-list.module.scss';

const LocationsList = dynamic(() => import('@/components/blocks/lists/locations-list/locations-list'));

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
        data={data}
        itemProps={{ size: 'lg', as: 'link' }}
      />
    </div>
  );
};

export default NewLocationsList;
