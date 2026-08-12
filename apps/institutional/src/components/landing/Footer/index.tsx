"use client";

import { useLanguage } from "@institutional/contexts/LanguageContext";
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
        <a href="/">
          <BrandLinkText>ByteBank</BrandLinkText>
        </a>
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
