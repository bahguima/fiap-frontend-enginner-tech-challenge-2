import type { DashboardResponse } from "./contracts";
import { apiEndpoints } from "./endpoints";
import { restClient } from "@/lib/http";

export const dashboardApi = {
  get: (accessToken: string) =>
    restClient.get<DashboardResponse>(apiEndpoints.dashboard, { accessToken }),
};
