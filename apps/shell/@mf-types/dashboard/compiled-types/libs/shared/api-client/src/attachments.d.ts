import type { ApiMessageResponse, AttachmentListResponse, CreateAttachmentRequest, TransactionAttachment } from "@banking/shared/types";
export interface AttachmentsApi {
    list: (transactionId: string) => Promise<AttachmentListResponse>;
    create: (transactionId: string, attachment: CreateAttachmentRequest) => Promise<TransactionAttachment>;
    remove: (attachmentId: string) => Promise<ApiMessageResponse>;
}
export declare const attachmentsApi: AttachmentsApi;
