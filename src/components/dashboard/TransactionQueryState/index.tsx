import type { TransactionQueryStateProps } from "./interface";
import { StatePanel } from "./styled";

export function TransactionQueryState({
  "data-testid": dataTestId,
  type,
}: TransactionQueryStateProps) {
  if (type === "error") {
    return (
      <StatePanel data-testid={dataTestId} role="alert">
        Não foi possível carregar as transações. Tente novamente.
      </StatePanel>
    );
  }

  if (type === "empty") {
    return (
      <StatePanel data-testid={dataTestId} role="status">
        Nenhuma transação encontrada.
      </StatePanel>
    );
  }

  if (type === "no-results") {
    return (
      <StatePanel data-testid={dataTestId} role="status">
        Nenhuma transação corresponde aos filtros informados.
      </StatePanel>
    );
  }

  return (
    <StatePanel data-testid={dataTestId} role="status">
      Carregando transações...
    </StatePanel>
  );
}
