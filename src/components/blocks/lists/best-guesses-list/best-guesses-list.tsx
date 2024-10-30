'use client';
import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import EmptyBestGuessesList from '@/components/blocks/lists/best-guesses-list/empty-best-guesses-list/empty-best-guesses-list';
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
      <GuessesList data={data} emptyComponent={<EmptyBestGuessesList />} />
    </div>
  );
};

export default BestGuessesList;
