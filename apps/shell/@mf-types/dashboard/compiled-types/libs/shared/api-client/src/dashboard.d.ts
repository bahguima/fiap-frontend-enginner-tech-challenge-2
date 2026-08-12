import type { DashboardHomeResponse, DashboardMonthlyResponse, DashboardSummaryResponse } from "@banking/shared/types";
export interface DashboardApi {
    getHome: (signal?: AbortSignal) => Promise<DashboardHomeResponse>;
    getSummary: (signal?: AbortSignal) => Promise<DashboardSummaryResponse>;
    getMonthly: (signal?: AbortSignal) => Promise<DashboardMonthlyResponse>;
}
export declare const dashboardApi: DashboardApi;
