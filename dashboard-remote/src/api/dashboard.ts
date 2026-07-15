import type { DashboardOverviewResponse } from "./interface";

export const getDashboardOverview = async (): Promise<DashboardOverviewResponse> => {
  const endpoint = new URL("/api/dashboard/overview", window.location.origin);
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Não foi possível carregar a visão geral financeira.");
  }

  return response.json();
};
