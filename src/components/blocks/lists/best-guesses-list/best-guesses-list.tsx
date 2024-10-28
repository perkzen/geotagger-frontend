'use client';
import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import EmptyGuessesList from '@/components/blocks/lists/guess-list/empty-guesses-list/empty-guesses-list';
import GuessesList from '@/components/blocks/lists/guess-list/guesses-list';
import { myBestGuessesQueryOptions } from '@/lib/api/locations/hooks';
import styles from './best-guesses-list.module.scss';

const BestGuessesList = () => {
  const t = useTranslations('profile');

  const { data: list } = useSuspenseQuery(
    myBestGuessesQueryOptions({
      take: 5,
      skip: 0,
    })
  );

  return (
    <div className={styles.container}>
      <Typography variant="h5">{t('myBestGuesses')}</Typography>
      <GuessesList data={list.data} emptyComponent={<EmptyGuessesList />} />
    </div>
  );
};

export default BestGuessesList;
