import type { TransactionAttachment } from "@/api/contracts";

export const attachmentFixtures: TransactionAttachment[] = [
  {
    id: "attachment-1",
    transactionId: "transaction-1",
    fileName: "comprovante-salario.pdf",
    mimeType: "application/pdf",
    sizeInBytes: 48231,
    uploadedAt: "2026-04-10T13:30:00.000Z",
    downloadUrl: "/api/attachments/attachment-1/content",
  },
];
