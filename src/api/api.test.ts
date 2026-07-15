import type { TransactionInput } from "./contracts";
import { apiEndpoints } from "./endpoints";
import { attachmentsApi } from "./attachments";
import { authApi } from "./auth";
import { categoriesApi } from "./categories";
import { dashboardApi } from "./dashboard";
import { transactionsApi } from "./transactions";
import { ApiClientError, restClient } from "@/lib/http";
import { getMockDelayMs } from "@/mocks/config";

const credentials = { email: "email@teste.com", password: "123" };
const transactionInput: TransactionInput = {
  description: "Compra de material",
  amount: 250,
  type: "expense",
  categoryId: "other",
  date: "2026-07-14",
  status: "completed",
};

describe("infraestrutura REST mockada", () => {
  it("autentica e recupera a sessão com o mesmo contrato REST", async () => {
    const loginResponse = await authApi.login(credentials);
    const sessionResponse = await authApi.session(loginResponse.accessToken);

    expect(loginResponse.user.email).toBe(credentials.email);
    expect(sessionResponse).toEqual(loginResponse);
    await expect(authApi.logout(loginResponse.accessToken)).resolves.toBeUndefined();
  });

  it("converte erros HTTP estruturados em ApiClientError", async () => {
    await expect(authApi.login({ ...credentials, password: "incorreta" })).rejects.toEqual(
      expect.objectContaining({
        name: "ApiClientError",
        status: 401,
        code: "INVALID_CREDENTIALS",
        message: "E-mail ou senha inválidos.",
      }),
    );

    await expect(categoriesApi.list("token-inválido")).rejects.toBeInstanceOf(ApiClientError);
  });

  it("entrega dashboard e categorias prontos para apresentação", async () => {
    const { accessToken } = await authApi.login(credentials);
    const dashboard = await dashboardApi.get(accessToken);
    const categories = await categoriesApi.list(accessToken);

    expect(dashboard.summary.formattedBalance).toMatch(/^R\$ /);
    expect(dashboard.chart.labels).toHaveLength(6);
    expect(dashboard.recentTransactions.length).toBeGreaterThan(0);
    expect(categories.data).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "deposit", name: "Depósito" })]),
    );
  });

  it("lista, cria, atualiza e exclui transações com paginação", async () => {
    const { accessToken } = await authApi.login(credentials);
    const initialList = await transactionsApi.list(accessToken, { page: 1, pageSize: 2, type: "expense" });
    const created = await transactionsApi.create(accessToken, transactionInput);
    const updated = await transactionsApi.update(accessToken, created.data.id, {
      ...transactionInput,
      description: "Compra de material atualizada",
      amount: 300,
    });

    expect(initialList.data).toHaveLength(2);
    expect(initialList.meta.totalItems).toBeGreaterThan(2);
    expect(created.data.formattedAmount).toBe("-R$ 250,00");
    expect(updated.data.description).toBe("Compra de material atualizada");

    await transactionsApi.delete(accessToken, created.data.id);
    await expect(transactionsApi.getById(accessToken, created.data.id)).rejects.toMatchObject({
      status: 404,
      code: "TRANSACTION_NOT_FOUND",
    });
  });

  it("envia, lista e remove anexos multipart", async () => {
    const { accessToken } = await authApi.login(credentials);
    const file = new File(["conteúdo"], "nota-fiscal.pdf", { type: "application/pdf" });
    const uploaded = await attachmentsApi.upload(accessToken, "transaction-2", file);
    const attachments = await attachmentsApi.list(accessToken, "transaction-2");

    expect(uploaded.data.fileName).toBe("nota-fiscal.pdf");
    expect(attachments.data).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: uploaded.data.id })]),
    );

    await attachmentsApi.delete(accessToken, uploaded.data.id);
    await expect(attachmentsApi.getById(accessToken, uploaded.data.id)).rejects.toMatchObject({
      status: 404,
      code: "ATTACHMENT_NOT_FOUND",
    });
  });

  it("permite simular erro e latência por requisição", async () => {
    const { accessToken } = await authApi.login(credentials);
    const delayedRequest = new Request("http://localhost/api/dashboard", {
      headers: { "x-mock-delay": "75" },
    });

    expect(getMockDelayMs(delayedRequest)).toBe(75);
    await expect(
      restClient.get(apiEndpoints.dashboard, {
        accessToken,
        headers: { "x-mock-scenario": "error", "x-mock-delay": "0" },
      }),
    ).rejects.toMatchObject({ status: 503, code: "MOCK_FORCED_ERROR" });
  });
});
