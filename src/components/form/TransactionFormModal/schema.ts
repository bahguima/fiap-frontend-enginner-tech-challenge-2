import { z } from "zod";
import type { TransactionType } from "@/api/contracts";

interface TransactionTypeOption {
  value: TransactionType;
  label: string;
}

interface TransactionCategoryOption {
  value: string;
  label: string;
}

interface TransactionStatusOption {
  value: "completed" | "pending" | "failed";
  label: string;
}

export const transactionTypeOptions: TransactionTypeOption[] = [
  { value: "income", label: "Total de Entradas" },
  { value: "expense", label: "Total de Saídas" },
];

export const transactionCategoryOptions: TransactionCategoryOption[] = [
  { value: "salary", label: "Salário" },
  { value: "deposit", label: "Depósito" },
  { value: "freelance", label: "Freelance" },
  { value: "food", label: "Alimentação" },
  { value: "housing", label: "Moradia" },
  { value: "transport", label: "Transporte" },
  { value: "entertainment", label: "Entretenimento" },
  { value: "utilities", label: "Contas e serviços" },
  { value: "insurance", label: "Seguros" },
  { value: "health", label: "Saúde" },
  { value: "shopping", label: "Compras" },
  { value: "transfer", label: "Transferência" },
  { value: "payment", label: "Pagamento" },
  { value: "withdrawal", label: "Saque" },
  { value: "investment", label: "Investimento" },
  { value: "other", label: "Outro" },
];

export const transactionStatusOptions: TransactionStatusOption[] = [
  { value: "completed", label: "Concluído" },
  { value: "pending", label: "Pendente" },
  { value: "failed", label: "Falhou" },
];

export const transactionFormSchema = z.object({
  description: z.string().trim().min(3, "Informe uma descrição com pelo menos 3 caracteres."),
  type: z.enum(["income", "expense"]),
  categoryId: z.string().min(1, "Informe a categoria da transação."),
  amount: z.coerce.number({ invalid_type_error: "Informe um valor válido." }).positive("Informe um valor maior que zero."),
  date: z.string().min(1, "Informe a data da transação."),
  status: z.enum(["completed", "pending", "failed"]),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;
