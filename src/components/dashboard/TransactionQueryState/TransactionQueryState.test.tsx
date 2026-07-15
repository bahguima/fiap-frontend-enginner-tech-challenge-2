import { render, screen } from "@testing-library/react";
import { TransactionQueryState } from ".";

describe("TransactionQueryState", () => {
  it("exibe o estado de carregamento", () => {
    render(<TransactionQueryState type="loading" />);
    expect(screen.getByRole("status")).toHaveTextContent("Carregando transações...");
  });

  it("exibe o erro como alerta", () => {
    render(<TransactionQueryState type="error" />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Não foi possível carregar as transações. Tente novamente.",
    );
  });

  it("exibe o estado vazio", () => {
    render(<TransactionQueryState type="empty" />);
    expect(screen.getByRole("status")).toHaveTextContent("Nenhuma transação encontrada.");
  });
});
