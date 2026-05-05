import { z } from "zod";

export const transactionTypeOptions = [
  { value: "income", label: "Total de Entradas" },
  { value: "expense", label: "Total de Saídas" },
] as const;

export const transactionCategoryOptions = ["Depósito", "Transferência", "Pagamento", "Saque", "Investimento", "Outro"] as const;

export const transactionStatusOptions = [
  { value: "completed", label: "Concluído" },
  { value: "pending", label: "Pendente" },
  { value: "failed", label: "Falhou" },
] as const;

export const transactionFormSchema = z.object({
  description: z.string().trim().min(3, "Informe uma descrição com pelo menos 3 caracteres."),
  type: z.enum(["income", "expense"]),
  category: z.enum(transactionCategoryOptions),
  amount: z.coerce.number({ invalid_type_error: "Informe um valor válido." }).positive("Informe um valor maior que zero."),
  date: z.string().min(1, "Informe a data da transação."),
  status: z.enum(["completed", "pending", "failed"]),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;
