import { render, screen } from "@testing-library/react";
import { mockDashboardHome } from "@banking/shared/testing/mocks/fixtures/dashboard";
import { getMockDashboardHome } from "@banking/shared/testing/mocks/state";
import { RecentTransactions } from ".";

describe("RecentTransactions", () => {
  it("exibe as transações já ordenadas pelo backend mockado", () => {
    const home = getMockDashboardHome();

    if (home.status !== "success") {
      throw new Error("O contrato de sucesso era esperado.");
    }

    render(
      <RecentTransactions recentTransactions={home.recentTransactions} />,
    );

    expect(
      screen.getByRole("heading", { name: "Transações recentes" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: "Depósito de salário" }),
    ).toBeInTheDocument();
  });

  it("exibe a mensagem vazia recebida pelo contrato", () => {
    render(
      <RecentTransactions
        recentTransactions={mockDashboardHome.recentTransactions}
      />,
    );

    expect(
      screen.getByText("Nenhuma transação recente encontrada."),
    ).toBeInTheDocument();
  });
});
