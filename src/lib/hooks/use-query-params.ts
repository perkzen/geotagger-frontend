'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DEFAULT_SKIP, DEFAULT_TAKE } from '@/lib/constants/pagination';
import { PaginationQuery } from '@/lib/types/pagination';

type QueryParams = PaginationQuery;

const defaultQueryParams: QueryParams = {
  take: DEFAULT_TAKE,
  skip: DEFAULT_SKIP,
};

export const useQueryParams = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateQueryParams = (params: Partial<QueryParams>) => {
    const newSearchParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        newSearchParams.set(key, encodeURIComponent(value.toString()));
      }
    });

    push(`${pathname}?${newSearchParams.toString()}`);
  };

  const parseQueryParams = (): QueryParams => {
    const take = parseInt(
      searchParams.get('take') ?? defaultQueryParams.take.toString(),
      10
    );
    const skip = parseInt(
      searchParams.get('skip') ?? defaultQueryParams.skip.toString(),
      10
    );

    return { take, skip };
  };

  return {
    urlQuery: parseQueryParams(),
    updateQueryParams,
  };
};
