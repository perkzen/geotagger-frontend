'use client';
import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import EmptyList from '@/components/blocks/empty-list/empty-list';
import GuessesList from '@/components/blocks/lists/guess-list/guesses-list';
import { myBestGuessesQueryOptions } from '@/lib/api/locations/hooks';
import { useQueryParams } from '@/lib/hooks/use-query-params';
import styles from './personal-best-guesses-list.module.scss';

const PersonalBestGuessesList = () => {
  const t = useTranslations();

  const { urlQuery } = useQueryParams();

  const { data } = useSuspenseQuery(myBestGuessesQueryOptions(urlQuery.guess));

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
      <GuessesList
        data={data}
        itemProps={{ size: 'lg' }}
        emptyComponent={
          <EmptyList
            title={t('home.noBestGuesses')}
            description={t('home.noBestGuessesDescription')}
          />
        }
      />
    </div>
  );
};

export default PersonalBestGuessesList;
