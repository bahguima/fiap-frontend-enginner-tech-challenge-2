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
  category: z.string().min(1, "Informe uma categoria."),
  amount: z.coerce.number({ invalid_type_error: "Informe um valor válido." }).positive("Informe um valor maior que zero."),
  date: z.string().min(1, "Informe a data da transação."),
  status: z.enum(["completed", "pending", "failed"]),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;

export function getDefaultTransactionFormValues(): TransactionFormValues {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");

  return {
    description: "",
    type: "income",
    category: "Depósito",
    amount: 0,
    date: `${year}-${month}-${day}`,
    status: "completed",
  };
}
