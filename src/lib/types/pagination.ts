export type Pagination<T> = {
  data: T[];
  meta: Metadata;
};

export type Metadata = {
  total: number;
  take: number;
  skip: number;
};

export type PaginationQuery = {
  take: number;
  skip: number;
};
