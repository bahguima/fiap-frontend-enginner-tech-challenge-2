import { fireEvent, render, screen } from "@testing-library/react";

import { TransactionPagination } from ".";

describe("TransactionPagination", () => {
  it("navega pelas páginas com botões semânticos", () => {
    const handlePageChange = jest.fn();

    render(
      <TransactionPagination
        firstPage={1}
        lastPage={4}
        nextPage={3}
        onPageChange={handlePageChange}
        page={2}
        previousPage={1}
        resultsLabel="Exibindo 6 a 10 de 20 transações"
        totalPages={4}
      />,
    );

    expect(
      screen.getByRole("navigation", { name: "Paginação de transações" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Página 2 de 4/)).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Ir para a página anterior" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Ir para a próxima página" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Ir para a última página" }),
    );

    expect(handlePageChange).toHaveBeenNthCalledWith(1, 1);
    expect(handlePageChange).toHaveBeenNthCalledWith(2, 3);
    expect(handlePageChange).toHaveBeenNthCalledWith(3, 4);
  });

  it("desabilita ações indisponíveis nos limites da paginação", () => {
    render(
      <TransactionPagination
        firstPage={1}
        lastPage={1}
        nextPage={null}
        onPageChange={jest.fn()}
        page={1}
        previousPage={null}
        resultsLabel="Exibindo 1 a 4 de 4 transações"
        totalPages={1}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Ir para a primeira página" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Ir para a página anterior" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Ir para a próxima página" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Ir para a última página" }),
    ).toBeDisabled();
  });
});
