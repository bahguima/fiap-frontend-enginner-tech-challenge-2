import { fireEvent, render, screen } from "@testing-library/react";
import { TransactionAttachmentsField } from ".";

describe("TransactionAttachmentsField", () => {
  it("encaminha os arquivos selecionados e permite limpar a seleção", () => {
    const onFilesChange = jest.fn();
    const onClearSelectedFiles = jest.fn();
    const file = new File(["conteúdo"], "recibo.pdf", {
      type: "application/pdf",
    });

    render(
      <TransactionAttachmentsField
        existingAttachments={[]}
        failedAttachments={[]}
        isExistingAttachmentsError={false}
        isExistingAttachmentsLoading={false}
        isRemovingAttachment={false}
        selectedFiles={[file]}
        onClearSelectedFiles={onClearSelectedFiles}
        onFilesChange={onFilesChange}
        onRemoveExistingAttachment={jest.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText("Selecione os comprovantes"), {
      target: { files: [file] },
    });
    expect(onFilesChange).toHaveBeenCalledWith([file]);

    fireEvent.click(screen.getByRole("button", { name: "Limpar seleção" }));
    expect(onClearSelectedFiles).toHaveBeenCalledTimes(1);
  });

  it("permite remover um anexo já persistido", () => {
    const onRemoveExistingAttachment = jest.fn();

    render(
      <TransactionAttachmentsField
        existingAttachments={[
          {
            id: "attachment-1",
            transactionId: "transaction-1",
            fileName: "comprovante.pdf",
            contentType: "application/pdf",
            size: 2048,
            formattedSize: "2 KB",
            uploadedAt: "2026-07-25T12:00:00.000Z",
            downloadUrl: "/api/attachments/attachment-1/content",
          },
        ]}
        failedAttachments={[]}
        isExistingAttachmentsError={false}
        isExistingAttachmentsLoading={false}
        isRemovingAttachment={false}
        selectedFiles={[]}
        onClearSelectedFiles={jest.fn()}
        onFilesChange={jest.fn()}
        onRemoveExistingAttachment={onRemoveExistingAttachment}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Remover anexo comprovante.pdf",
      }),
    );
    expect(onRemoveExistingAttachment).toHaveBeenCalledWith("attachment-1");
  });
});
