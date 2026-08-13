"use client";

import { useEffect } from "react";
import { AppSidebar } from "@dashboard/components/dashboard/AppSidebar";
import { LanguageSelector } from "@dashboard/components/LanguageSelector";
import { ThemeToggle } from "@dashboard/components/ThemeToggle";
import { SidebarProvider, SidebarTrigger } from "@banking/shared/ui/components/sidebar";
import { useAuth } from "@banking/shared/auth";
import { useLanguage } from "@dashboard/contexts/LanguageContext";

import type { DashboardLayoutProps } from "./interface";
import { DashboardBody, DashboardRoot, Greeting, Header, HeaderActions, HeaderStart, Main } from "./styled";

export default function DashboardLayout({
  children,
  loginUrl = "/login",
}: DashboardLayoutProps) {
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (
      !isLoading &&
      !user &&
      window.location.pathname.startsWith("/dashboard")
    ) {
      if (loginUrl.startsWith("http://") || loginUrl.startsWith("https://")) {
        window.location.assign(loginUrl);
      } else {
        window.history.replaceState({}, "", loginUrl);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
    }
  }, [isLoading, loginUrl, user]);

  if (isLoading) return <p role="status">Verificando sessão...</p>;
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
