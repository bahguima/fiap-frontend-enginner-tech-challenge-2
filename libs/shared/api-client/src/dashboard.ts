import type {
  DashboardHomeResponse,
  DashboardMonthlyResponse,
  DashboardSummaryResponse,
} from "@banking/shared/types";
import { restClient } from "./client";
import { apiEndpoints } from "./endpoints";

export interface DashboardApi {
  getHome: (signal?: AbortSignal) => Promise<DashboardHomeResponse>;
  getSummary: (signal?: AbortSignal) => Promise<DashboardSummaryResponse>;
  getMonthly: (signal?: AbortSignal) => Promise<DashboardMonthlyResponse>;
}

export const dashboardApi: DashboardApi = {
  getHome: (signal) =>
    restClient.request<DashboardHomeResponse>(apiEndpoints.dashboard.home, {
      signal,
    }),
  getSummary: (signal) =>
    restClient.request<DashboardSummaryResponse>(
      apiEndpoints.dashboard.summary,
      { signal },
    ),
  getMonthly: (signal) =>
    restClient.request<DashboardMonthlyResponse>(
      apiEndpoints.dashboard.monthly,
      { signal },
    ),
};
