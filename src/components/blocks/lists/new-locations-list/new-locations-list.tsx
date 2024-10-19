'use client';
import { useTranslations } from 'next-intl';
import { Button, Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import LocationsList from '@/components/blocks/lists/locations-list/locations-list';
import { locationsListQueryOptions } from '@/lib/api/locations/hooks';
import { useQueryParams } from '@/lib/hooks/use-query-params';
import styles from './new-locations-list.module.scss';

const NewLocationsList = () => {
  const t = useTranslations();
  const { urlQuery } = useQueryParams();

  const { data: locations } = useSuspenseQuery(
    locationsListQueryOptions(urlQuery)
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
      <LocationsList data={locations.data} itemProps={{ size: 'lg' }} />
      <Button variant="outlined" className={styles.loadMore}>
        {t('shared.loadMore')}
      </Button>
    </div>
  );
};

export default NewLocationsList;
