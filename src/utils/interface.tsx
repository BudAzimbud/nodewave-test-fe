export interface Pagination {
  page: number;
}

export interface IResponsePagination<T> {
  content: {
    entries: T[];
    totalData: number;
    totalPage: number;
  };
  message: string;
  errors: unknown[]
}
