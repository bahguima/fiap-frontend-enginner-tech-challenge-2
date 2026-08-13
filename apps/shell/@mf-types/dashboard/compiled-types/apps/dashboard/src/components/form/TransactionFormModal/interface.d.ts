import type { Transaction, TransactionAttachment, TransactionCategory, TransactionEditableFields, TransactionSubmissionResult } from "@banking/shared/types";
export interface ITransactionFormModalProps {
    "data-testid"?: string;
    mode: "create" | "edit";
    open: boolean;
    transaction?: Transaction | null;
    categories: TransactionCategory[];
    existingAttachments: TransactionAttachment[];
    isCategoriesError: boolean;
    isCategoriesLoading: boolean;
    isExistingAttachmentsError: boolean;
    isExistingAttachmentsLoading: boolean;
    isRemovingAttachment: boolean;
    onOpenChange: (open: boolean) => void;
    onRemoveExistingAttachment: (attachmentId: string) => void;
    onSubmit: (transaction: TransactionEditableFields, attachments: File[], persistedTransaction: Transaction | null) => Promise<TransactionSubmissionResult>;
    errorMessage?: string | null;
    isSubmitting?: boolean;
}
export interface ICategoryOptionItemsProps {
    categories: TransactionCategory[];
    index?: number;
}
