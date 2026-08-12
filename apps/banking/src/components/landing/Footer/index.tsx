"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { BrandLinkText } from "@banking/shared/ui/styles/shared";

import type { FooterProps } from "./interface";
import {
  FooterAnchor,
  FooterContainer,
  FooterLinks,
  FooterRoot,
  Rights,
} from "./styled";

export function Footer({ "data-testid": dataTestId }: FooterProps) {
  const { t } = useLanguage();

  return (
    <FooterRoot data-testid={dataTestId}>
      <FooterContainer>
        <Link href="/">
          <BrandLinkText>ByteBank</BrandLinkText>
        </Link>
        <FooterLinks>
          <FooterAnchor href="#features">{t("nav.features")}</FooterAnchor>
          <FooterAnchor href="#benefits">{t("nav.benefits")}</FooterAnchor>
          <FooterAnchor href="#testimonials">{t("footer.trust")}</FooterAnchor>
        </FooterLinks>
        <Rights>{t("footer.rights")}</Rights>
      </FooterContainer>
    </FooterRoot>
  );
}
