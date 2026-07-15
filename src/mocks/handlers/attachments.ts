import { http, HttpResponse } from "msw";
import { apiBaseUrl, apiEndpoints } from "@/api/endpoints";
import {
  createMockAttachment,
  deleteMockAttachment,
  findMockAttachment,
  findMockTransaction,
  listMockAttachments,
} from "../database";
import { apiError, applyMockState, getPathParameter, mockEndpoint, requireAuthorization } from "./common";

const maximumFileSizeInBytes = 5 * 1024 * 1024;
const acceptedMimeTypes = ["application/pdf", "image/jpeg", "image/png"];

export const attachmentHandlers = [
  http.get(
    mockEndpoint(`${apiEndpoints.transactions.list}/:transactionId/attachments`),
    async ({ request, params }) => {
      const preparedResponse = await prepareProtectedRequest(request);
      if (preparedResponse) return preparedResponse;

      const transactionId = getPathParameter(params.transactionId);
      if (!transactionId || !findMockTransaction(transactionId)) {
        return apiError(404, "TRANSACTION_NOT_FOUND", "A transação não foi encontrada.");
      }

      return HttpResponse.json({ data: listMockAttachments(transactionId) });
    },
  ),

  http.post(
    mockEndpoint(`${apiEndpoints.transactions.list}/:transactionId/attachments`),
    async ({ request, params }) => {
      const preparedResponse = await prepareProtectedRequest(request);
      if (preparedResponse) return preparedResponse;

      const transactionId = getPathParameter(params.transactionId);
      if (!transactionId || !findMockTransaction(transactionId)) {
        return apiError(404, "TRANSACTION_NOT_FOUND", "A transação não foi encontrada.");
      }

      let formData: FormData;
      try {
        formData = await request.formData();
      } catch {
        return apiError(400, "INVALID_MULTIPART", "Envie o anexo como multipart/form-data.");
      }

      const file = formData.get("file");
      if (!isUploadedFile(file)) {
        return apiError(422, "FILE_REQUIRED", "Selecione um arquivo para anexar.");
      }
      if (!acceptedMimeTypes.includes(file.type)) {
        return apiError(422, "INVALID_FILE_TYPE", "Envie um arquivo PDF, JPEG ou PNG.");
      }
      if (file.size > maximumFileSizeInBytes) {
        return apiError(422, "FILE_TOO_LARGE", "O arquivo deve ter no máximo 5 MB.");
      }
      if (listMockAttachments(transactionId).some((attachment) => attachment.fileName === file.name)) {
        return apiError(409, "ATTACHMENT_ALREADY_EXISTS", "Já existe um anexo com este nome.");
      }

      const attachment = createMockAttachment(transactionId, file.name, file.type, file.size);
      return HttpResponse.json({ data: attachment }, { status: 201 });
    },
  ),

  http.get(mockEndpoint(`${apiBaseUrl}/attachments/:attachmentId`), async ({ request, params }) => {
    const preparedResponse = await prepareProtectedRequest(request);
    if (preparedResponse) return preparedResponse;

    const attachmentId = getPathParameter(params.attachmentId);
    const attachment = attachmentId ? findMockAttachment(attachmentId) : null;
    return attachment
      ? HttpResponse.json({ data: attachment })
      : apiError(404, "ATTACHMENT_NOT_FOUND", "O anexo não foi encontrado.");
  }),

  http.get(mockEndpoint(`${apiBaseUrl}/attachments/:attachmentId/content`), async ({ request, params }) => {
    const preparedResponse = await prepareProtectedRequest(request);
    if (preparedResponse) return preparedResponse;

    const attachmentId = getPathParameter(params.attachmentId);
    const attachment = attachmentId ? findMockAttachment(attachmentId) : null;
    if (!attachment) return apiError(404, "ATTACHMENT_NOT_FOUND", "O anexo não foi encontrado.");

    return new HttpResponse("Conteúdo de anexo simulado pelo MSW.", {
      headers: {
        "Content-Disposition": `attachment; filename="${attachment.fileName}"`,
        "Content-Type": attachment.mimeType,
      },
    });
  }),

  http.delete(mockEndpoint(`${apiBaseUrl}/attachments/:attachmentId`), async ({ request, params }) => {
    const preparedResponse = await prepareProtectedRequest(request);
    if (preparedResponse) return preparedResponse;

    const attachmentId = getPathParameter(params.attachmentId);
    return attachmentId && deleteMockAttachment(attachmentId)
      ? new HttpResponse(null, { status: 204 })
      : apiError(404, "ATTACHMENT_NOT_FOUND", "O anexo não foi encontrado.");
  }),
];

async function prepareProtectedRequest(request: Request): Promise<Response | null> {
  const mockResponse = await applyMockState(request);
  return mockResponse ?? requireAuthorization(request);
}

function isUploadedFile(value: FormDataEntryValue | null): value is File {
  return value !== null && typeof value !== "string";
}
