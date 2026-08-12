export interface ITransactionPaginationProps {
  "data-testid"?: string;
  firstPage: number;
  lastPage: number;
  nextPage: number | null;
  onPageChange: (page: number) => void;
  page: number;
  previousPage: number | null;
  resultsLabel: string;
  totalPages: number;
}
