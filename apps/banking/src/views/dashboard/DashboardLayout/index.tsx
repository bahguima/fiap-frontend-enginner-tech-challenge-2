"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarProvider, SidebarTrigger } from "@banking/shared/ui/components/sidebar";
import { useAuth } from "@banking/shared/auth";
import { useLanguage } from "@/contexts/LanguageContext";

import type { DashboardLayoutProps } from "./interface";
import { DashboardBody, DashboardRoot, Greeting, Header, HeaderActions, HeaderStart, Main } from "./styled";

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [isLoading, router, user]);

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
