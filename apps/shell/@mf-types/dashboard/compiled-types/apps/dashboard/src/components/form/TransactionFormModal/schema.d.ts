import { z } from "zod";
import { type TransactionEditableFields } from "@banking/shared/types";
export interface TransactionFormValues {
    transaction: TransactionEditableFields;
    attachments: File[];
}
export declare function createTransactionFormSchema(existingAttachmentCount: number): z.ZodType<TransactionFormValues>;
export declare function getDefaultTransactionFormValues(category?: string): TransactionFormValues;
export declare function getEditTransactionFormValues(transaction: TransactionEditableFields): TransactionFormValues;
export declare function getCurrentDateValue(): string;
