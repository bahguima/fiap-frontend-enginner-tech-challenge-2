"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@banking/shared/ui/components/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { BrandLinkText } from "@banking/shared/ui/styles/shared";

import type { NavbarLink, NavbarProps } from "./interface";
import {
  DesktopActions,
  DesktopLinks,
  MobileAnchor,
  MobileCta,
  MobileMenuButton,
  MobilePanel,
  MobilePanelInner,
  MobileTools,
  MutedButton,
  NavAnchor,
  NavContainer,
  NavRoot,
} from "./styled";

export function Navbar({ "data-testid": dataTestId }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const links: NavbarLink[] = [
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.benefits"), href: "#benefits" },
    { label: t("footer.trust"), href: "#testimonials" },
  ];

  return (
    <NavRoot data-testid={dataTestId}>
      <NavContainer>
        <Link href="/">
          <BrandLinkText>ByteBank</BrandLinkText>
        </Link>

        <DesktopLinks>
          {links.map((link) => (
            <NavAnchor key={link.href} href={link.href}>
              {link.label}
            </NavAnchor>
          ))}
        </DesktopLinks>

        <DesktopActions>
          <ThemeToggle />
          <LanguageSelector />
          <MutedButton asChild variant="ghost" size="sm">
            <Link href="/login">
              {t("nav.signin")}
            </Link>
          </MutedButton>
          <Button asChild variant="gradient" size="sm">
            <Link href="/login">
              {t("nav.getstarted")}
            </Link>
          </Button>
        </DesktopActions>

        <MobileMenuButton
          type="button"
          onClick={() => setOpen((currentOpen) => !currentOpen)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </MobileMenuButton>
      </NavContainer>

      <AnimatePresence>
        {open && (
          <MobilePanel
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <MobilePanelInner>
              {links.map((link) => (
                <MobileAnchor
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </MobileAnchor>
              ))}
              <MobileTools>
                <ThemeToggle />
                <LanguageSelector />
              </MobileTools>
              <MobileCta asChild variant="gradient">
                <Link href="/login" onClick={() => setOpen(false)}>
                  {t("nav.getstarted")}
                </Link>
              </MobileCta>
            </MobilePanelInner>
          </MobilePanel>
        )}
      </AnimatePresence>
    </NavRoot>
  );
}
