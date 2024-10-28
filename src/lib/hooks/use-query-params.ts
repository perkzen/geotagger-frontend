'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DEFAULT_SKIP, DEFAULT_TAKE } from '@/lib/constants/pagination';
import { PaginationQuery } from '@/lib/types/pagination';

type QueryParams = {
  guess: PaginationQuery;
  location: PaginationQuery;
};

const defaultQueryParams: QueryParams = {
  guess: {
    take: DEFAULT_TAKE,
    skip: DEFAULT_SKIP,
  },
  location: {
    take: DEFAULT_TAKE,
    skip: DEFAULT_SKIP,
  },
};

export const useQueryParams = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateQueryParams = (params: Partial<QueryParams>) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (params.guess) {
      Object.entries(params.guess).forEach(([key, value]) => {
        if (value !== undefined) {
          newSearchParams.set(
            `guess.${key}`,
            encodeURIComponent(value.toString())
          );
        }
      });
    }

    if (params.location) {
      Object.entries(params.location).forEach(([key, value]) => {
        if (value !== undefined) {
          newSearchParams.set(
            `location.${key}`,
            encodeURIComponent(value.toString())
          );
        }
      });
    }

    push(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  const parseQueryParams = (): QueryParams => {
    const guessTake = parseInt(
      searchParams.get('guess.take') ??
        defaultQueryParams.guess.take.toString(),
      10
    );
    const guessSkip = parseInt(
      searchParams.get('guess.skip') ??
        defaultQueryParams.guess.skip.toString(),
      10
    );

    const locationTake = parseInt(
      searchParams.get('location.take') ??
        defaultQueryParams.location.take.toString(),
      10
    );
    const locationSkip = parseInt(
      searchParams.get('location.skip') ??
        defaultQueryParams.location.skip.toString(),
      10
    );

    return {
      guess: { take: guessTake, skip: guessSkip },
      location: { take: locationTake, skip: locationSkip },
    };
  };

  return {
    urlQuery: parseQueryParams(),
    updateQueryParams,
  };
};
