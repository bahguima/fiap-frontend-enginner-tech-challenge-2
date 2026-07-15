export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  previousPage: number | null;
  nextPage: number | null;
}

export interface ListResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
