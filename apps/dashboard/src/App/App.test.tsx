import { render, screen } from "@testing-library/react";
import { DashboardApp } from ".";

jest.mock("@dashboard/views/dashboard/DashboardLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("@dashboard/views/dashboard/OverviewPage", () => ({
  __esModule: true,
  default: () => <h1>Visão financeira</h1>,
}));

jest.mock("@dashboard/views/dashboard/ProfilePage", () => ({
  __esModule: true,
  default: () => <h1>Perfil</h1>,
}));

describe("DashboardApp", () => {
  it("renderiza a Home autenticada na rota principal", () => {
    render(<DashboardApp pathname="/dashboard" />);

    expect(
      screen.getByRole("heading", { name: "Visão financeira" }),
    ).toBeInTheDocument();
  });

  it("preserva o roteamento interno do dashboard", () => {
    render(<DashboardApp pathname="/dashboard/profile" />);

    expect(
      screen.getByRole("heading", { name: "Perfil" }),
    ).toBeInTheDocument();
  });
});
