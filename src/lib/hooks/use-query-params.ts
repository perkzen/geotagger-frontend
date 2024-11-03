'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DEFAULT_SKIP, DEFAULT_TAKE } from '@/lib/constants/pagination';
import { PaginationQuery } from '@/lib/types/pagination';

type QueryParams = {
  guess: PaginationQuery;
  location: PaginationQuery;
  logs: PaginationQuery;
};

type UseQueryParams = { take?: number };

const parsePaginationParams = (
  searchParams: URLSearchParams,
  key: keyof QueryParams,
  defaults: PaginationQuery
) => {
  return {
    take: parseInt(
      searchParams.get(`${key}.take`) ?? defaults.take.toString(),
      10
    ),
    skip: parseInt(
      searchParams.get(`${key}.skip`) ?? defaults.skip.toString(),
      10
    ),
  };
};

const setPaginationParams = (
  params: Partial<QueryParams>,
  key: keyof QueryParams,
  newSearchParams: URLSearchParams
) => {
  if (params[key]) {
    Object.entries(params[key]).forEach(([k, value]) => {
      if (value !== undefined) {
        newSearchParams.set(
          `${key}.${k}`,
          encodeURIComponent(value.toString())
        );
      }
    });
  }
};

export const useQueryParams = (options?: UseQueryParams) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const defaultQueryParams: QueryParams = {
    guess: { take: options?.take ?? DEFAULT_TAKE, skip: DEFAULT_SKIP },
    location: { take: options?.take ?? DEFAULT_TAKE, skip: DEFAULT_SKIP },
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
      guess: parsePaginationParams(
        searchParams,
        'guess',
        defaultQueryParams.guess
      ),
      location: parsePaginationParams(
        searchParams,
        'location',
        defaultQueryParams.location
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
