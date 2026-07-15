import type { AttachmentResponse, AttachmentsResponse } from "./contracts";
import { apiEndpoints } from "./endpoints";
import { restClient } from "@/lib/http";

export const attachmentsApi = {
  list: (accessToken: string, transactionId: string) =>
    restClient.get<AttachmentsResponse>(apiEndpoints.transactions.attachments(transactionId), { accessToken }),
  getById: (accessToken: string, attachmentId: string) =>
    restClient.get<AttachmentResponse>(apiEndpoints.attachments.detail(attachmentId), { accessToken }),
  upload: (accessToken: string, transactionId: string, file: File) => {
    const formData = new FormData();
    formData.set("file", file);
    return restClient.postForm<AttachmentResponse>(apiEndpoints.transactions.attachments(transactionId), formData, {
      accessToken,
    });
  },
  delete: (accessToken: string, attachmentId: string) =>
    restClient.delete(apiEndpoints.attachments.detail(attachmentId), { accessToken }),
};
