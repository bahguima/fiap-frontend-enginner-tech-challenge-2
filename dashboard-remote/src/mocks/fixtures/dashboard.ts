import type { DashboardOverviewResponse } from "@/api/interface";

export const dashboardOverviewFixture: DashboardOverviewResponse = {
  title: "Visão geral financeira",
  subtitle: "Resumo consolidado da sua conta ByteBank.",
  updatedAtLabel: "Atualizado agora",
  balance: {
    label: "Saldo atual",
    formattedValue: "R$ 12.500,00",
    description: "Disponível em conta",
  },
  income: {
    label: "Receitas",
    formattedValue: "R$ 17.468,00",
    description: "Entradas no período",
  },
  expenses: {
    label: "Despesas",
    formattedValue: "R$ 2.579,00",
    description: "Saídas no período",
  },
  savings: {
    label: "Economia",
    formattedValue: "R$ 14.889,00",
    description: "Resultado do período",
  },
};
