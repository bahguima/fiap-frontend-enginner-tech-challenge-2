import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TransactionFormModal } from ".";

describe("TransactionFormModal", () => {
  it("renderiza o formulário de criação aberto", () => {
    render(
      <TransactionFormModal
        mode="create"
        open
        onOpenChange={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Nova Transação" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Descrição")).toBeInTheDocument();
    expect(screen.getByLabelText("Valor")).toBeInTheDocument();
  });

  it("envia valores válidos e aguarda o resultado da mutation", async () => {
    const onOpenChange = jest.fn();
    const onSubmit = jest.fn();

    render(
      <TransactionFormModal
        mode="create"
        open
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByLabelText("Descrição"), {
      target: { value: "Pagamento teste" },
    });
    fireEvent.change(screen.getByLabelText("Valor"), {
      target: { value: "125.5" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Criar" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: 125.5,
          description: "Pagamento teste",
        }),
      );
    });

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("exibe erro da mutation e bloqueia ações durante o envio", () => {
    render(
      <TransactionFormModal
        mode="create"
        open
        onOpenChange={jest.fn()}
        onSubmit={jest.fn()}
        errorMessage="Não foi possível criar a transação."
        isSubmitting
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Não foi possível criar a transação.",
    );
    expect(screen.getByRole("button", { name: "Criar" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled();
  });
});
