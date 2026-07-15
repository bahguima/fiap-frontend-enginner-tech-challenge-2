import { http, HttpResponse } from "msw";
import type { DashboardResponse } from "@/api/contracts";
import { apiEndpoints } from "@/api/endpoints";
import { getMockDashboardSummary, listMockTransactions } from "../database";
import { dashboardChartFixture } from "../fixtures/dashboard";
import { applyMockState, mockEndpoint, requireAuthorization } from "./common";

export const dashboardHandlers = [
  http.get(mockEndpoint(apiEndpoints.dashboard), async ({ request }) => {
    const mockResponse = await applyMockState(request);
    if (mockResponse) return mockResponse;

    const unauthorizedResponse = requireAuthorization(request);
    if (unauthorizedResponse) return unauthorizedResponse;

    const response: DashboardResponse = {
      summary: getMockDashboardSummary(),
      chart: dashboardChartFixture,
      recentTransactions: listMockTransactions().slice(0, 5),
    };
    return HttpResponse.json(response);
  }),
];
