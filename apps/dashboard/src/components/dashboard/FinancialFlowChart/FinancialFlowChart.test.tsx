import { render, screen } from "@testing-library/react";
import { mockDashboardHome } from "@banking/shared/testing/mocks/fixtures/dashboard";
import { FinancialFlowChart } from ".";

describe("FinancialFlowChart", () => {
  it("oferece uma tabela acessível com os mesmos dados do gráfico", () => {
    render(<FinancialFlowChart cashFlow={mockDashboardHome.cashFlow} />);

    expect(
      screen.getByRole("heading", { name: "Fluxo financeiro por período" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("table", {
        name: mockDashboardHome.cashFlow.accessibleDescription,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: "R$ 17.468,00" }),
    ).toBeInTheDocument();
  });
});
