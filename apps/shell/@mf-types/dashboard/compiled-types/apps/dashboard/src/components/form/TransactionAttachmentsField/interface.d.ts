import type { AttachmentUploadFailure, TransactionAttachment } from "@banking/shared/types";
export interface ITransactionAttachmentsFieldProps {
    "data-testid"?: string;
    existingAttachments: TransactionAttachment[];
    failedAttachments: AttachmentUploadFailure[];
    isExistingAttachmentsError: boolean;
    isExistingAttachmentsLoading: boolean;
    isRemovingAttachment: boolean;
    selectedFiles: File[];
    validationError?: string;
    onClearSelectedFiles: () => void;
    onFilesChange: (files: File[]) => void;
    onRemoveExistingAttachment: (attachmentId: string) => void;
}
export interface IExistingAttachmentItemsProps {
    attachments: TransactionAttachment[];
    index?: number;
    isRemovingAttachment: boolean;
    onRemove: (attachmentId: string) => void;
}
export interface ISelectedFileItemsProps {
    files: File[];
    index?: number;
}
export interface IUploadFailureItemsProps {
    failures: AttachmentUploadFailure[];
    index?: number;
}
