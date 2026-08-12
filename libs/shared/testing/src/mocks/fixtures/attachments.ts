import type { TransactionAttachment } from "@banking/shared/types";

export const mockAttachments: TransactionAttachment[] = [
  {
    id: "attachment-1",
    transactionId: "transaction-2",
    fileName: "comprovante-streaming.pdf",
    contentType: "application/pdf",
    size: 245760,
    formattedSize: "240 KB",
    uploadedAt: "2026-04-09T14:30:00.000Z",
    downloadUrl: "/api/attachments/attachment-1/content",
  },
];
