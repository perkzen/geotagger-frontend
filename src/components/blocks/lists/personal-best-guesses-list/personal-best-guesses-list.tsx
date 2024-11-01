'use client';
import { useTranslations } from 'next-intl';
import { useSuspenseQuery } from '@tanstack/react-query';
import EmptyList from '@/components/blocks/empty-list/empty-list';
import GuessesList from '@/components/blocks/lists/guess-list/guesses-list';
import { myBestGuessesQueryOptions } from '@/lib/api/locations/hooks';
import { useQueryParams } from '@/lib/hooks/use-query-params';

const PersonalBestGuessesList = () => {
  const t = useTranslations();
  const { urlQuery } = useQueryParams();
  const { data } = useSuspenseQuery(myBestGuessesQueryOptions(urlQuery.guess));

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
