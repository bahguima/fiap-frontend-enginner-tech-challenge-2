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
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { BrandLinkText } from "@/styles/shared";

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

  const handleLogout = () => {
    logout();
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
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === "/dashboard"}>
                      <item.icon />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <LogoutButton type="button" onClick={handleLogout}>
                    <LogOut />
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
