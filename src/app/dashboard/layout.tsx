import type { ReactNode } from "react";
import DashboardLayout from "@/views/dashboard/DashboardLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
