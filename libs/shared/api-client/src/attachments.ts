import type {
  ApiMessageResponse,
  AttachmentListResponse,
  CreateAttachmentRequest,
  TransactionAttachment,
} from "@banking/shared/types";
import { restClient } from "./client";
import { apiEndpoints } from "./endpoints";

export interface AttachmentsApi {
  list: (transactionId: string) => Promise<AttachmentListResponse>;
  create: (
    transactionId: string,
    attachment: CreateAttachmentRequest,
  ) => Promise<TransactionAttachment>;
  remove: (attachmentId: string) => Promise<ApiMessageResponse>;
}

export const attachmentsApi: AttachmentsApi = {
  list: (transactionId) =>
    restClient.request<AttachmentListResponse>(
      apiEndpoints.transactions.attachments(transactionId),
    ),
  create: (transactionId, attachment) =>
    uploadAttachment(transactionId, attachment),
  remove: (attachmentId) =>
    restClient.request<ApiMessageResponse>(
      apiEndpoints.attachments.detail(attachmentId),
      {
        method: "DELETE",
      },
    ),
};

function uploadAttachment(
  transactionId: string,
  attachment: CreateAttachmentRequest,
) {
  const formData = new FormData();
  formData.append("file", attachment.file);

  return restClient.requestMultipart<TransactionAttachment>(
    apiEndpoints.transactions.attachments(transactionId),
    formData,
  );
}
