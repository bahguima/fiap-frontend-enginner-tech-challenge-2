export interface TransactionAttachmentPolicy {
  maximumFiles: number;
  maximumFileSize: number;
  acceptedMimeTypes: string[];
  acceptedFileExtensions: string;
}

export const transactionAttachmentPolicy: TransactionAttachmentPolicy = {
  maximumFiles: 5,
  maximumFileSize: 5 * 1024 * 1024,
  acceptedMimeTypes: ["application/pdf", "image/jpeg", "image/png"],
  acceptedFileExtensions: ".pdf,.jpg,.jpeg,.png",
};

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
