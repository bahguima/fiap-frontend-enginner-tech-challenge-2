import { render, screen } from "@testing-library/react";
import { mockDashboardHome } from "@banking/shared/testing/mocks/fixtures/dashboard";
import { CategoryDistributionChart } from ".";

describe("CategoryDistributionChart", () => {
  it("disponibiliza a distribuição em uma tabela acessível", () => {
    render(
      <CategoryDistributionChart
        distribution={mockDashboardHome.categoryDistribution}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Distribuição por categoria" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("table", {
        name: mockDashboardHome.categoryDistribution.accessibleDescription,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("rowheader", { name: "Moradia" })).toBeInTheDocument();
  });
});
