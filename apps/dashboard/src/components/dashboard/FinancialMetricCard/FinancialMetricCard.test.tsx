import { Wallet } from "lucide-react";
import { render, screen } from "@testing-library/react";
import { FinancialMetricCard } from ".";

describe("FinancialMetricCard", () => {
  it("exibe o valor e a comparação recebidos do contrato", () => {
    render(
      <FinancialMetricCard
        icon={Wallet}
        tone="primary"
        metric={{
          label: "Saldo",
          amount: { value: 1200, formattedValue: "R$ 1.200,00" },
          comparisonText: "10% acima do período anterior",
          comparisonTone: "positive",
        }}
      />,
    );

    expect(screen.getByRole("heading", { name: "Saldo" })).toBeInTheDocument();
    expect(screen.getByText("R$ 1.200,00")).toBeInTheDocument();
    expect(
      screen.getByText("10% acima do período anterior"),
    ).toBeInTheDocument();
  });
});
