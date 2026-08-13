"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@banking/shared/api-client/dashboard";
import { profileApi } from "@banking/shared/api-client/profile";
import { dashboardQueryKeys } from "../api/queryKeys";

export function useDashboardSummaryQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.summary(),
    queryFn: ({ signal }) => dashboardApi.getSummary(signal),
  });
}

export function useDashboardMonthlyQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.monthly(),
    queryFn: ({ signal }) => dashboardApi.getMonthly(signal),
  });
}

export function useProfileQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.profile(),
    queryFn: ({ signal }) => profileApi.get(signal),
  });
}
