import { http, HttpResponse } from "msw";
import type {
  ApiErrorResponse,
  DashboardHomeResponse,
  DashboardMonthlyResponse,
  DashboardSummaryResponse,
} from "@banking/shared/types";
import { mockApiEndpoints } from "@banking/shared/api-client/endpoints";
import {
  mockDashboardHomeEmpty,
  mockDashboardMonthly,
} from "../fixtures/dashboard";
import { getMockDashboardHome, getMockDashboardSummary } from "../state";
import { applyMockBehavior } from "./behavior";

export const dashboardHandlers = [
  http.get<never, never, DashboardHomeResponse | ApiErrorResponse>(
    mockApiEndpoints.dashboard.home,
    async ({ request }) => {
      const forcedError = await applyMockBehavior(request, { status: 503 });
      if (forcedError) return forcedError;

      const requestUrl = new URL(request.url);

      return HttpResponse.json<DashboardHomeResponse>(
        requestUrl.searchParams.get("mockEmpty") === "true"
          ? mockDashboardHomeEmpty
          : getMockDashboardHome(),
      );
    },
  ),
  http.get<never, never, DashboardSummaryResponse | ApiErrorResponse>(
    mockApiEndpoints.dashboard.summary,
    async ({ request }) => {
      const forcedError = await applyMockBehavior(request, { status: 503 });
      if (forcedError) return forcedError;

      return HttpResponse.json<DashboardSummaryResponse>(
        getMockDashboardSummary(),
      );
    },
  ),
  http.get<never, never, DashboardMonthlyResponse | ApiErrorResponse>(
    mockApiEndpoints.dashboard.monthly,
    async ({ request }) => {
      const forcedError = await applyMockBehavior(request, { status: 503 });
      if (forcedError) return forcedError;

      return HttpResponse.json<DashboardMonthlyResponse>(mockDashboardMonthly);
    },
  ),
];
