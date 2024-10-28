'use client';
import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import GuessesList from '@/components/blocks/lists/guess-list/guesses-list';
import { myBestGuessesQueryOptions } from '@/lib/api/locations/hooks';
import styles from './personal-best-guesses-list.module.scss';

const PersonalBestGuessesList = () => {
  const t = useTranslations();

  const { data: list } = useSuspenseQuery(
    myBestGuessesQueryOptions({
      take: 5,
      skip: 0,
    })
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Typography variant="h4" color="primary">
          {t('home.personalBestGuesses')}
        </Typography>
        <Typography variant="body1">
          {t('home.bestGuessesDescription')}
        </Typography>
      </div>
      <GuessesList data={list.data} itemProps={{ size: 'lg' }} />
    </div>
  );
};

export default PersonalBestGuessesList;
