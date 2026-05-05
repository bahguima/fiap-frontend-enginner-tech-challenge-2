"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

import type { DashboardLayoutProps } from "./interface";
import { DashboardBody, DashboardRoot, Greeting, Header, HeaderActions, HeaderStart, Main } from "./styled";

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [router, user]);

  if (!user) return null;

  return (
    <SidebarProvider>
      <DashboardRoot>
        <AppSidebar />
        <DashboardBody>
          <Header>
            <HeaderStart>
              <SidebarTrigger />
              <Greeting>{t("dash.hello")}</Greeting>
            </HeaderStart>
            <HeaderActions>
              <ThemeToggle />
              <LanguageSelector />
            </HeaderActions>
          </Header>
          <Main>{children}</Main>
        </DashboardBody>
      </DashboardRoot>
    </SidebarProvider>
  );
}
