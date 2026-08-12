export interface TransactionAttachmentPolicy {
    maximumFiles: number;
    maximumFileSize: number;
    acceptedMimeTypes: string[];
    acceptedFileExtensions: string;
}
export declare const transactionAttachmentPolicy: TransactionAttachmentPolicy;
export interface TransactionAttachment {
    id: string;
    transactionId: string;
    fileName: string;
    contentType: string;
    size: number;
    formattedSize: string;
    uploadedAt: string;
    downloadUrl: string;
}
export interface AttachmentListResponse {
    items: TransactionAttachment[];
}
export interface CreateAttachmentRequest {
    file: File;
}
export interface AttachmentUploadFailure {
    file: File;
    message: string;
}
export interface TransactionSubmissionResult {
    transaction: import("./transactions").Transaction;
    uploadedAttachments: TransactionAttachment[];
    failedAttachments: AttachmentUploadFailure[];
}
