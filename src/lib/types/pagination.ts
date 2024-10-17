export type Pagination<T> = {
  data: T[];
  meta: {
    total: number;
    take: number;
    skip: number;
  };
};

export type PaginationQuery = {
  take: number;
  skip: number;
};
