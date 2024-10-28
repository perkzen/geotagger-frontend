'use client';
import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import EmptyGuessesList from '@/components/blocks/lists/guess-list/empty-guesses-list/empty-guesses-list';
import GuessesList from '@/components/blocks/lists/guess-list/guesses-list';
import { myBestGuessesQueryOptions } from '@/lib/api/locations/hooks';
import { useQueryParams } from '@/lib/hooks/use-query-params';
import styles from './best-guesses-list.module.scss';

const BestGuessesList = () => {
  const t = useTranslations('profile');

  const { urlQuery } = useQueryParams();

  const { data } = useSuspenseQuery(
    myBestGuessesQueryOptions(urlQuery.guess)
  );

  return (
    <div className={styles.container}>
      <Typography variant="h5">{t('myBestGuesses')}</Typography>
      <GuessesList paginatedData={data} emptyComponent={<EmptyGuessesList />} />
    </div>
  );
};

export default BestGuessesList;
