import { shouldEnableBrowserMocks } from "./config";

describe("configuração dos mocks do dashboard no navegador", () => {
  it("habilita o MSW por padrão no desenvolvimento", () => {
    expect(shouldEnableBrowserMocks(undefined)).toBe(true);
  });

  it("permite desabilitar o MSW explicitamente", () => {
    expect(shouldEnableBrowserMocks("disabled")).toBe(false);
  });

  it("mantém o MSW habilitado no build local de produção", () => {
    expect(shouldEnableBrowserMocks(undefined)).toBe(true);
  });
});
