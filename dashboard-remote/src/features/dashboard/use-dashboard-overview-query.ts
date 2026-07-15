"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "@/api/dashboard";

export const useDashboardOverviewQuery = () =>
  useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: getDashboardOverview,
  });
