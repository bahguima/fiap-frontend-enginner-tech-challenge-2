import { render, screen } from "@testing-library/react";
import { InstitutionalApp } from ".";

describe("InstitutionalApp", () => {
  it("renderiza a landing page migrada na rota inicial", () => {
    render(<InstitutionalApp pathname="/" />);

    expect(
      screen.getByRole("heading", {
        name: /Seu Dinheiro, Reimaginado com Pura Elegância/,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Feito para Você/,
      }),
    ).toBeInTheDocument();
  });

  it("renderiza o login na rota correspondente", () => {
    render(<InstitutionalApp pathname="/login" />);

    expect(
      screen.getByRole("heading", { name: "Bem-vindo de volta" }),
    ).toBeInTheDocument();
  });
});
