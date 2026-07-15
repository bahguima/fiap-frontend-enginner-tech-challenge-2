import type { Transaction, TransactionInput } from "@/api/contracts";
import {
  getDefaultTransactionFormValues,
  getTransactionFormValues,
  transactionFormSchema,
} from "@/lib/transactions";

const formInput: TransactionInput = {
  description: "Pagamento de aluguel",
  type: "expense",
  categoryId: "payment",
  amount: 1500,
  date: "2026-05-03",
  status: "completed",
};

const transaction: Transaction = {
  id: "transaction-1",
  description: "Pagamento de aluguel",
  amount: -1500,
  formattedAmount: "-R$ 1.500,00",
  type: "expense",
  typeLabel: "Saída",
  category: { id: "payment", name: "Pagamento" },
  date: "2026-05-03",
  formattedDate: "2026-05-03",
  status: "completed",
  statusLabel: "Concluído",
  attachmentsCount: 0,
  formInput,
};

describe("helpers do formulário de transações", () => {
  it("valida e converte o valor informado no formulário", () => {
    const result = transactionFormSchema.safeParse({ ...formInput, amount: "250.5" });

    expect(result.success).toBe(true);
    expect(result.success && result.data.amount).toBe(250.5);
  });

  it("usa os dados editáveis preparados pelo backend", () => {
    expect(getTransactionFormValues(transaction)).toEqual(formInput);
  });

  it("cria os valores padrão sem armazenar dados remotos", () => {
    expect(getDefaultTransactionFormValues()).toEqual(
      expect.objectContaining({
        description: "",
        type: "income",
        categoryId: "deposit",
        amount: 0,
        status: "completed",
      }),
    );
  });
});
