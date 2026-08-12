import { render, screen } from "@testing-library/react";
import { RemoteSlot } from ".";

const RemoteDisponivel = () => <h2>Conteúdo remoto disponível</h2>;

describe("RemoteSlot", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("renderiza o remote quando o carregamento termina", async () => {
    const loadComponent = jest.fn(async () => RemoteDisponivel);

    render(
      <RemoteSlot name="Institucional" loadComponent={loadComponent} />,
    );

    expect(
      await screen.findByRole("heading", {
        name: "Conteúdo remoto disponível",
      }),
    ).toBeInTheDocument();
  });

  it("exibe um fallback acessível quando o remote falha", async () => {
    const loadComponent = jest.fn(() =>
      Promise.reject(new Error("Remote indisponível")),
    );

    render(<RemoteSlot name="Dashboard" loadComponent={loadComponent} />);

    expect(await screen.findByRole("alert")).toHaveAccessibleName(
      "Não foi possível carregar Dashboard",
    );
    expect(
      screen.getByRole("button", { name: "Tentar novamente" }),
    ).toBeEnabled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Falha ao carregar o remote Dashboard.",
      expect.any(Error),
    );
  });

  it("permite tentar novamente depois de uma falha", async () => {
    let attempt = 0;
    const loadComponent = jest.fn(async () => {
      attempt += 1;

      if (attempt === 1) {
        throw new Error("Remote indisponível");
      }

      return RemoteDisponivel;
    });

    render(<RemoteSlot name="Dashboard" loadComponent={loadComponent} />);

    const retryButton = await screen.findByRole("button", {
      name: "Tentar novamente",
    });
    retryButton.click();

    expect(
      await screen.findByRole("heading", {
        name: "Conteúdo remoto disponível",
      }),
    ).toBeInTheDocument();
    expect(loadComponent).toHaveBeenCalledTimes(2);
  });
});
