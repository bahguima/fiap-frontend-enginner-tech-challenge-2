export interface TransactionAttachment {
  id: string;
  transactionId: string;
  fileName: string;
  mimeType: string;
  sizeInBytes: number;
  uploadedAt: string;
  downloadUrl: string;
}

export interface AttachmentsResponse {
  data: TransactionAttachment[];
}

export interface AttachmentResponse {
  data: TransactionAttachment;
}
