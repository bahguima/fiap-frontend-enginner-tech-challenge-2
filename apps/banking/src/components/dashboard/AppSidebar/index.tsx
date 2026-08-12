"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowDownLeft,
  ArrowUpRight,
  LayoutDashboard,
  List,
  LogOut,
  User,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@banking/shared/ui/components/sidebar";
import { useAuth } from "@banking/shared/auth";
import { useLanguage } from "@/contexts/LanguageContext";
import { BrandLinkText } from "@banking/shared/ui/styles/shared";

import type { AppSidebarProps } from "./interface";
import { BrandArea, LogoutButton } from "./styled";

export function AppSidebar({ "data-testid": dataTestId }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { t } = useLanguage();
  const { logout } = useAuth();
  const router = useRouter();

  const items = [
    { title: t("sidebar.overview"), url: "/dashboard", icon: LayoutDashboard },
    { title: t("sidebar.statement"), url: "/dashboard/statement", icon: List },
    {
      title: t("sidebar.income"),
      url: "/dashboard/income",
      icon: ArrowDownLeft,
    },
    {
      title: t("sidebar.expenses"),
      url: "/dashboard/expenses",
      icon: ArrowUpRight,
    },
    { title: t("sidebar.profile"), url: "/dashboard/profile", icon: User },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <Sidebar collapsible="icon" data-testid={dataTestId}>
      <SidebarContent>
        <BrandArea>
          <Link href="/">
            <BrandLinkText>{collapsed ? "BT" : "ByteBank"}</BrandLinkText>
          </Link>
        </BrandArea>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      aria-label={collapsed ? item.title : undefined}
                    >
                      <item.icon aria-hidden="true" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={t("sidebar.logout")}>
                  <LogoutButton
                    type="button"
                    onClick={handleLogout}
                    aria-label={collapsed ? t("sidebar.logout") : undefined}
                  >
                    <LogOut aria-hidden="true" />
                    {!collapsed && <span>{t("sidebar.logout")}</span>}
                  </LogoutButton>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
