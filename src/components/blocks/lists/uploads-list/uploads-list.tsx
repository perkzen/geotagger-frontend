'use client';
import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import LocationsList from '@/components/blocks/lists/locations-list/locations-list';
import EmptyUploadsList from '@/components/blocks/lists/uploads-list/empty-uploads-list/empty-uploads-list';
import { myLocationsQueryOptions } from '@/lib/api/locations/hooks';
import { useQueryParams } from '@/lib/hooks/use-query-params';
import styles from './uploads-list.module.scss';

const UploadsList = () => {
  const t = useTranslations('profile');

  const { urlQuery } = useQueryParams();

  const { data: list } = useSuspenseQuery(myLocationsQueryOptions(urlQuery));

  const locations = list?.data;

  return (
    <div className={styles.container}>
      <Typography variant="h5">{t('myUploads')}</Typography>
      <LocationsList data={locations} emptyComponent={<EmptyUploadsList />} />
    </div>
  );
};

export default UploadsList;
