import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const acessarLogin = async (page: Page) => {
  await page.goto("/login");
  const tituloLogin = page.getByRole("heading", {
    name: "Bem-vindo de volta",
  });

  await tituloLogin.waitFor();
  await expect(tituloLogin).toBeVisible();
};

const autenticar = async (page: Page) => {
  await acessarLogin(page);
  await page.getByLabel("E-mail").fill("email@teste.com");
  await page.getByLabel("Senha").fill("123");
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  const tituloDashboard = page.getByRole("heading", {
    name: "Visão financeira",
  });

  await tituloDashboard.waitFor();
  await expect(tituloDashboard).toBeVisible();
};

test.describe("Fluxo federado do shell", () => {
  test("exibe a landing page com conteúdo acessível", async ({ page }) => {
    await page.goto("/");
    const tituloLanding = page.getByRole("heading", {
      level: 1,
      name: /Seu Dinheiro/,
    });

    await tituloLanding.waitFor();
    await expect(tituloLanding).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Entrar", exact: true }),
    ).toBeVisible();
  });

  test("navega da landing page até o login", async ({ page }) => {
    await page.goto("/");

    await page
      .getByRole("link", { name: "Entrar", exact: true })
      .click();

    await expect(page).toHaveURL(/\/login$/);
    const tituloLogin = page.getByRole("heading", {
      name: "Bem-vindo de volta",
    });

    await tituloLogin.waitFor();
    await expect(tituloLogin).toBeVisible();
  });

  test("informa erro ao usar credenciais inválidas", async ({ page }) => {
    await acessarLogin(page);

    await page.getByLabel("E-mail").fill("invalido@teste.com");
    await page.getByLabel("Senha").fill("senha-invalida");
    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(
      page.getByRole("alert"),
    ).toHaveText("E-mail ou senha inválidos");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("autentica e chega ao dashboard federado", async ({ page }) => {
    await autenticar(page);

    await expect(
      page.getByRole("link", { name: "Visão Geral" }),
    ).toBeVisible();
  });

  test("redireciona acesso direto à rota protegida para o login", async ({
    page,
  }) => {
    await page.goto("/dashboard");

    await expect(page).toHaveURL(/\/login$/);
    const tituloLogin = page.getByRole("heading", {
      name: "Bem-vindo de volta",
    });

    await tituloLogin.waitFor();
    await expect(tituloLogin).toBeVisible();
  });

  test("encerra a sessão no logout", async ({ page }) => {
    await autenticar(page);

    await page.getByRole("button", { name: "Sair" }).click();

    await expect(page).toHaveURL(/\/$/);
    const tituloLanding = page.getByRole("heading", {
      level: 1,
      name: /Seu Dinheiro/,
    });

    await tituloLanding.waitFor();
    await expect(tituloLanding).toBeVisible();

    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login$/);
  });
});
