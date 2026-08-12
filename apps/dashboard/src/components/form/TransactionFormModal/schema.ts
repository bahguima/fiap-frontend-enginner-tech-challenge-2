import { z } from "zod";
import {
  transactionAttachmentPolicy,
  type TransactionEditableFields,
} from "@banking/shared/types";

export interface TransactionFormValues {
  transaction: TransactionEditableFields;
  attachments: File[];
}

const attachmentSchema = z
  .custom<File>((value) => value instanceof File, {
    message: "Selecione arquivos válidos.",
  })
  .refine((file) => file.size > 0, {
    message: "Não é possível anexar um arquivo vazio.",
  })
  .refine(
    (file) =>
      transactionAttachmentPolicy.acceptedMimeTypes.includes(file.type),
    {
      message: "Envie apenas arquivos PDF, JPEG ou PNG.",
    },
  )
  .refine(
    (file) => file.size <= transactionAttachmentPolicy.maximumFileSize,
    {
      message: "Cada arquivo deve ter no máximo 5 MB.",
    },
  );

const transactionSchema: z.ZodType<TransactionEditableFields> = z.object({
  description: z
    .string()
    .trim()
    .min(3, "Informe uma descrição com pelo menos 3 caracteres.")
    .max(120, "A descrição deve ter no máximo 120 caracteres."),
  type: z.enum(["income", "expense"]),
  category: z.string().trim().min(1, "Selecione uma categoria."),
  amount: z.coerce
    .number({ invalid_type_error: "Informe um valor válido." })
    .min(0.01, "Informe um valor de pelo menos R$ 0,01.")
    .max(
      999999999.99,
      "Informe um valor de até R$ 999.999.999,99.",
    ),
  date: z
    .string()
    .min(1, "Informe a data da transação.")
    .refine(isValidTransactionDate, {
      message: "Informe uma data válida que não esteja no futuro.",
    }),
  status: z.enum(["completed", "pending", "failed"]),
  observation: z
    .string()
    .trim()
    .max(500, "A observação deve ter no máximo 500 caracteres."),
});

export function createTransactionFormSchema(
  existingAttachmentCount: number,
): z.ZodType<TransactionFormValues> {
  const availableAttachmentSlots = Math.max(
    0,
    transactionAttachmentPolicy.maximumFiles - existingAttachmentCount,
  );

  return z.object({
    transaction: transactionSchema,
    attachments: z
      .array(attachmentSchema)
      .max(
        availableAttachmentSlots,
        "Cada transação pode ter no máximo 5 anexos.",
      ),
  });
}

export function getDefaultTransactionFormValues(
  category = "",
): TransactionFormValues {
  return {
    transaction: {
      description: "",
      type: "income",
      category,
      amount: 0,
      date: getCurrentDateValue(),
      status: "completed",
      observation: "",
    },
    attachments: [],
  };
}

export function getEditTransactionFormValues(
  transaction: TransactionEditableFields,
): TransactionFormValues {
  return {
    transaction,
    attachments: [],
  };
}

export function getCurrentDateValue() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function isValidTransactionDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const parsedDate = new Date(`${value}T12:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return false;

  const normalizedDate = [
    parsedDate.getFullYear().toString().padStart(4, "0"),
    (parsedDate.getMonth() + 1).toString().padStart(2, "0"),
    parsedDate.getDate().toString().padStart(2, "0"),
  ].join("-");

  return normalizedDate === value && value <= getCurrentDateValue();
}
