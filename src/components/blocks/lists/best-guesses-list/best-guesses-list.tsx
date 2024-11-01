'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import EmptyBestGuessesList from '@/components/blocks/lists/best-guesses-list/empty-best-guesses-list/empty-best-guesses-list';
import GuessesList from '@/components/blocks/lists/guess-list/guesses-list';
import { myBestGuessesQueryOptions } from '@/lib/api/locations/hooks';
import { useQueryParams } from '@/lib/hooks/use-query-params';

const BestGuessesList = () => {
  const { urlQuery } = useQueryParams();

  const { data } = useSuspenseQuery(myBestGuessesQueryOptions(urlQuery.guess));

  return <GuessesList data={data} emptyComponent={<EmptyBestGuessesList />} />;
};

export default BestGuessesList;
