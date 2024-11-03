'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DEFAULT_SKIP, DEFAULT_TAKE } from '@/lib/constants/pagination';
import { PaginationQuery } from '@/lib/types/pagination';

type QueryParams = {
  guesses: PaginationQuery;
  locations: PaginationQuery;
  logs: PaginationQuery;
};

type UseQueryParams = { take?: number };

const parsePaginationParams = (
  searchParams: URLSearchParams,
  key: keyof QueryParams,
  defaults: PaginationQuery
): PaginationQuery => {
  const take = parseInt(searchParams.get(key) ?? defaults.take.toString(), 10);

  return {
    take: isNaN(take) ? defaults.take : take,
    skip: defaults.skip, // 'skip' remains internal and is not read from URL
  };
};

const setPaginationParams = (
  params: Partial<QueryParams>,
  key: keyof QueryParams,
  newSearchParams: URLSearchParams
): void => {
  const takeValue = params[key]?.take;
  if (takeValue !== undefined) {
    newSearchParams.set(key, encodeURIComponent(takeValue.toString()));
  }
};

export const useQueryParams = (options?: UseQueryParams) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const defaultQueryParams: QueryParams = {
    guesses: { take: options?.take ?? DEFAULT_TAKE, skip: DEFAULT_SKIP },
    locations: { take: options?.take ?? DEFAULT_TAKE, skip: DEFAULT_SKIP },
    logs: { take: options?.take ?? DEFAULT_TAKE, skip: DEFAULT_SKIP },
  };

  const updateQueryParams = (params: Partial<QueryParams>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const keys = Object.keys(defaultQueryParams) as (keyof QueryParams)[];

    keys.forEach((key) => setPaginationParams(params, key, newSearchParams));

    push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const parseQueryParams = (): QueryParams => {
    return {
      guesses: parsePaginationParams(
        searchParams,
        'guesses',
        defaultQueryParams.guesses
      ),
      locations: parsePaginationParams(
        searchParams,
        'locations',
        defaultQueryParams.locations
      ),
      logs: parsePaginationParams(
        searchParams,
        'logs',
        defaultQueryParams.logs
      ),
    };
  };

  return {
    urlQuery: parseQueryParams(),
    updateQueryParams,
  };
};
