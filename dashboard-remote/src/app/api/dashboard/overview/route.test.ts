import { GET } from "./route";
import { dashboardOverviewFixture } from "@/mocks/fixtures/dashboard";

describe("rota da visão geral financeira", () => {
  it("retorna o contrato esperado pelo dashboard", async () => {
    const response = GET();

    await expect(response.json()).resolves.toEqual(dashboardOverviewFixture);
    expect(response.status).toBe(200);
  });
});
