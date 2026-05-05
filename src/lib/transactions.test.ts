import type { Transaction } from "@/data/transactions";
import {
  calculateTransactionSummary,
  createTransactionFromForm,
  getEditableCategory,
  transactionFormSchema,
  updateTransactionFromForm,
} from "@/lib/transactions";
import type { TransactionFormValues } from "@/lib/transactions";

const formValues: TransactionFormValues = {
  description: "Pagamento de aluguel",
  type: "expense",
  category: "Pagamento",
  amount: 1500,
  date: "2026-05-03",
  status: "completed",
};

describe("transaction helpers", () => {
  it("creates expense transactions with negative amount", () => {
    const transaction = createTransactionFromForm(formValues, "transaction-1");

    expect(transaction).toMatchObject({
      id: "transaction-1",
      description: "Pagamento de aluguel",
      amount: -1500,
      type: "expense",
      category: "Pagamento",
      date: "2026-05-03",
      status: "completed",
    });
  });

  it("updates a transaction while preserving its id", () => {
    const transaction: Transaction = {
      id: "transaction-1",
      description: "Pagamento de aluguel",
      amount: -1500,
      type: "expense",
      category: "Pagamento",
      date: "2026-05-03",
      status: "completed",
    };

    const updated = updateTransactionFromForm(transaction, {
      ...formValues,
      description: "Depósito recebido",
      type: "income",
      category: "Depósito",
      amount: 900,
    });

    expect(updated.id).toBe("transaction-1");
    expect(updated.amount).toBe(900);
    expect(updated.type).toBe("income");
    expect(updated.description).toBe("Depósito recebido");
  });

  it("calculates income, expenses and current balance", () => {
    const summary = calculateTransactionSummary([
      createTransactionFromForm({ ...formValues, type: "income", category: "Depósito", amount: 2500 }, "1"),
      createTransactionFromForm({ ...formValues, type: "expense", amount: 800 }, "2"),
    ]);

    expect(summary).toEqual({
      totalIncome: 2500,
      totalExpense: 800,
      balance: 1700,
    });
  });

  it("validates transaction form data with zod", () => {
    const result = transactionFormSchema.safeParse({
      ...formValues,
      amount: "250.5",
    });

    expect(result.success).toBe(true);
    expect(result.success && result.data.amount).toBe(250.5);
  });

  it("falls back to Outro for categories outside the editable list", () => {
    expect(getEditableCategory("Salary")).toBe("Outro");
  });
});
