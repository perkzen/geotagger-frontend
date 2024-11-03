'use client';
import { useTranslations } from 'next-intl';
import { useMediaQuery, useTheme } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import GuessCard from '@/components/blocks/cards/guess-card/guess-card';
import EmptyList from '@/components/blocks/empty-list/empty-list';
import GuessesList from '@/components/blocks/lists/guess-list/guesses-list';
import { myBestGuessesQueryOptions } from '@/lib/api/locations/hooks';
import { useQueryParams } from '@/lib/hooks/use-query-params';
import styles from './personal-best-guesses-list.module.scss';

const PersonalBestGuessesList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const t = useTranslations();
  const { urlQuery } = useQueryParams();
  const { data } = useSuspenseQuery(
    myBestGuessesQueryOptions(
      isMobile ? { ...urlQuery.guesses, take: 3 } : urlQuery.guesses
    )
  );

  if (isMobile && data.meta.total !== 0) {
    return (
      <div className={styles.container}>
          <div className={styles.list}>
            {data.data.map((guess, i) => (
              <GuessCard key={i} guess={guess} size={'lg'} />
            ))}
          </div>
      </div>
    );
  }

  return (
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
  );
};

export default PersonalBestGuessesList;
