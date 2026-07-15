import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { DashboardOverview } from ".";
import { dashboardOverviewFixture } from "@/mocks/fixtures/dashboard";

describe("DashboardOverview", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renderiza os indicadores preparados pelo contrato REST", async () => {
    jest.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(dashboardOverviewFixture)),
    );
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <DashboardOverview />
      </QueryClientProvider>,
    );

    expect(
      await screen.findByRole("heading", { name: "Visão geral financeira" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Indicadores financeiros" }),
    ).toHaveTextContent("R$ 12.500,00");
  });
});
