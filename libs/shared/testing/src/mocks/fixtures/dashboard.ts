import type {
  DashboardHomeEmptyResponse,
  DashboardHomeSuccessResponse,
  DashboardMonthlyResponse,
} from "@banking/shared/types";

export const mockDashboardMonthly: DashboardMonthlyResponse = {
  accessibleDescription:
    "Evolução mensal de entradas e saídas entre novembro de 2025 e abril de 2026.",
  labels: ["Nov", "Dez", "Jan", "Fev", "Mar", "Abr"],
  incomeValues: [12400, 14200, 11800, 13500, 15840, 17468],
  expenseValues: [8200, 9100, 7800, 8900, 9200, 2579],
  firstPeriod: {
    label: "Nov",
    income: { value: 12400, formattedValue: "R$ 12.400,00" },
    expense: { value: 8200, formattedValue: "R$ 8.200,00" },
  },
  secondPeriod: {
    label: "Dez",
    income: { value: 14200, formattedValue: "R$ 14.200,00" },
    expense: { value: 9100, formattedValue: "R$ 9.100,00" },
  },
  thirdPeriod: {
    label: "Jan",
    income: { value: 11800, formattedValue: "R$ 11.800,00" },
    expense: { value: 7800, formattedValue: "R$ 7.800,00" },
  },
  fourthPeriod: {
    label: "Fev",
    income: { value: 13500, formattedValue: "R$ 13.500,00" },
    expense: { value: 8900, formattedValue: "R$ 8.900,00" },
  },
  fifthPeriod: {
    label: "Mar",
    income: { value: 15840, formattedValue: "R$ 15.840,00" },
    expense: { value: 9200, formattedValue: "R$ 9.200,00" },
  },
  sixthPeriod: {
    label: "Abr",
    income: { value: 17468, formattedValue: "R$ 17.468,00" },
    expense: { value: 2579, formattedValue: "R$ 2.579,00" },
  },
};

const emptyRecentTransactions = {
  title: "Transações recentes",
  emptyMessage: "Nenhuma transação recente encontrada.",
  firstTransaction: null,
  secondTransaction: null,
  thirdTransaction: null,
  fourthTransaction: null,
  fifthTransaction: null,
};

export const mockDashboardHome: DashboardHomeSuccessResponse = {
  status: "success",
  title: "Visão financeira",
  subtitle: "Acompanhe os principais indicadores da sua conta.",
  periodLabel: "Abril de 2026",
  balance: {
    label: "Saldo",
    amount: { value: 12740.57, formattedValue: "R$ 12.740,57" },
    comparisonText: "18,4% acima do período anterior",
    comparisonTone: "positive",
  },
  totalIncome: {
    label: "Total de receitas",
    amount: { value: 17468, formattedValue: "R$ 17.468,00" },
    comparisonText: "10,3% acima do período anterior",
    comparisonTone: "positive",
  },
  totalExpense: {
    label: "Total de despesas",
    amount: { value: 4727.43, formattedValue: "R$ 4.727,43" },
    comparisonText: "8,1% abaixo do período anterior",
    comparisonTone: "positive",
  },
  cashFlow: {
    title: "Fluxo financeiro por período",
    accessibleDescription:
      "Comparação mensal entre receitas e despesas de novembro de 2025 a abril de 2026.",
    firstPeriod: {
      label: "Nov",
      income: { value: 12400, formattedValue: "R$ 12.400,00" },
      expense: { value: 8200, formattedValue: "R$ 8.200,00" },
      incomeHeight: "71%",
      expenseHeight: "64%",
    },
    secondPeriod: {
      label: "Dez",
      income: { value: 14200, formattedValue: "R$ 14.200,00" },
      expense: { value: 9100, formattedValue: "R$ 9.100,00" },
      incomeHeight: "81%",
      expenseHeight: "71%",
    },
    thirdPeriod: {
      label: "Jan",
      income: { value: 11800, formattedValue: "R$ 11.800,00" },
      expense: { value: 7800, formattedValue: "R$ 7.800,00" },
      incomeHeight: "67%",
      expenseHeight: "61%",
    },
    fourthPeriod: {
      label: "Fev",
      income: { value: 13500, formattedValue: "R$ 13.500,00" },
      expense: { value: 8900, formattedValue: "R$ 8.900,00" },
      incomeHeight: "77%",
      expenseHeight: "69%",
    },
    fifthPeriod: {
      label: "Mar",
      income: { value: 15840, formattedValue: "R$ 15.840,00" },
      expense: { value: 9200, formattedValue: "R$ 9.200,00" },
      incomeHeight: "90%",
      expenseHeight: "72%",
    },
    sixthPeriod: {
      label: "Abr",
      income: { value: 17468, formattedValue: "R$ 17.468,00" },
      expense: { value: 4727.43, formattedValue: "R$ 4.727,43" },
      incomeHeight: "100%",
      expenseHeight: "37%",
    },
  },
  categoryDistribution: {
    title: "Distribuição por categoria",
    accessibleDescription:
      "Despesas de abril de 2026 distribuídas entre moradia, alimentação, transporte, lazer e outros.",
    firstCategory: {
      label: "Moradia",
      amount: { value: 1796.42, formattedValue: "R$ 1.796,42" },
      formattedPercentage: "38%",
      barWidth: "38%",
      tone: "primary",
    },
    secondCategory: {
      label: "Alimentação",
      amount: { value: 1134.58, formattedValue: "R$ 1.134,58" },
      formattedPercentage: "24%",
      barWidth: "24%",
      tone: "accent",
    },
    thirdCategory: {
      label: "Transporte",
      amount: { value: 850.94, formattedValue: "R$ 850,94" },
      formattedPercentage: "18%",
      barWidth: "18%",
      tone: "success",
    },
    fourthCategory: {
      label: "Lazer",
      amount: { value: 567.29, formattedValue: "R$ 567,29" },
      formattedPercentage: "12%",
      barWidth: "12%",
      tone: "warning",
    },
    fifthCategory: {
      label: "Outros",
      amount: { value: 378.2, formattedValue: "R$ 378,20" },
      formattedPercentage: "8%",
      barWidth: "8%",
      tone: "muted",
    },
  },
  recentTransactions: emptyRecentTransactions,
};

export const mockDashboardHomeEmpty: DashboardHomeEmptyResponse = {
  status: "empty",
  title: "Visão financeira",
  subtitle: "Acompanhe os principais indicadores da sua conta.",
  emptyTitle: "Ainda não há dados financeiros",
  emptyMessage:
    "Registre sua primeira transação para visualizar as análises deste período.",
};
