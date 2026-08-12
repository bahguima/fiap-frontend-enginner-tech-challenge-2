import { fireEvent, render, screen } from "@testing-library/react";
import { QueryState } from ".";

describe("QueryState", () => {
  it("informa o carregamento com uma região de status", () => {
    render(<QueryState kind="loading" message="Carregando transações..." />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "Carregando transações...",
    );
  });

  it("permite tentar novamente após um erro", () => {
    const onRetry = jest.fn();

    render(
      <QueryState
        kind="error"
        message="Não foi possível carregar as transações."
        onRetry={onRetry}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Tentar novamente" }));

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("informa quando a consulta não possui resultados", () => {
    render(
      <QueryState kind="empty" message="Nenhuma transação encontrada." />,
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "Nenhuma transação encontrada.",
    );
  });
});
