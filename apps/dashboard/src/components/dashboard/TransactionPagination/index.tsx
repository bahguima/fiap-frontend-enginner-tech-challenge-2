import { Button } from "@banking/shared/ui/components/button";

import type { ITransactionPaginationProps } from "./interface";
import {
  PaginationActions,
  PaginationRoot,
  PaginationSummary,
} from "./styled";

export const TransactionPagination = ({
  "data-testid": dataTestId,
  firstPage,
  lastPage,
  nextPage,
  onPageChange,
  page,
  previousPage,
  resultsLabel,
  totalPages,
}: ITransactionPaginationProps) => {
  return (
    <PaginationRoot
      aria-label="Paginação de transações"
      data-testid={dataTestId}
    >
      <PaginationSummary aria-live="polite">
        {resultsLabel}. Página {page} de {totalPages}.
      </PaginationSummary>
      <PaginationActions>
        <Button
          aria-label="Ir para a primeira página"
          disabled={previousPage === null}
          onClick={() => onPageChange(firstPage)}
          type="button"
          variant="outline"
        >
          Primeira
        </Button>
        <Button
          aria-label="Ir para a página anterior"
          disabled={previousPage === null}
          onClick={() => {
            if (previousPage !== null) onPageChange(previousPage);
          }}
          type="button"
          variant="outline"
        >
          Anterior
        </Button>
        <Button
          aria-label="Ir para a próxima página"
          disabled={nextPage === null}
          onClick={() => {
            if (nextPage !== null) onPageChange(nextPage);
          }}
          type="button"
          variant="outline"
        >
          Próxima
        </Button>
        <Button
          aria-label="Ir para a última página"
          disabled={nextPage === null}
          onClick={() => onPageChange(lastPage)}
          type="button"
          variant="outline"
        >
          Última
        </Button>
      </PaginationActions>
    </PaginationRoot>
  );
};
