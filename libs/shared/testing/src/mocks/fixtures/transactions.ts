import type { CreateTransactionRequest } from "@banking/shared/types";

export interface MockTransactionSeed extends CreateTransactionRequest {
  id: string;
}

export const mockTransactionSeeds: MockTransactionSeed[] = [
  {
    id: "transaction-1",
    description: "Depósito de salário",
    amount: 8500,
    type: "income",
    category: "Depósito",
    date: "2026-04-10",
    status: "completed",
  },
  {
    id: "transaction-2",
    description: "Assinatura de streaming",
    amount: 59.9,
    type: "expense",
    category: "Pagamento",
    date: "2026-04-09",
    status: "completed",
  },
  {
    id: "transaction-3",
    description: "Compra no mercado",
    amount: 427.43,
    type: "expense",
    category: "Pagamento",
    date: "2026-04-08",
    status: "completed",
  },
  {
    id: "transaction-4",
    description: "Pagamento de projeto",
    amount: 2200,
    type: "income",
    category: "Transferência",
    date: "2026-04-07",
    status: "completed",
  },
  {
    id: "transaction-5",
    description: "Conta de energia",
    amount: 189.5,
    type: "expense",
    category: "Pagamento",
    date: "2026-04-06",
    status: "pending",
  },
  {
    id: "transaction-6",
    description: "Aplicação financeira",
    amount: 500,
    type: "expense",
    category: "Investimento",
    date: "2026-04-05",
    status: "failed",
  },
];
