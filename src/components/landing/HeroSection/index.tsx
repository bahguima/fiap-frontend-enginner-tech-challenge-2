"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { GradientText } from "@/styles/shared";

import type { HeroSectionProps } from "./interface";
import {
  AccentGlow,
  Badge,
  Balance,
  FloatingCard,
  GlowLayer,
  HeroActions,
  HeroCardMotion,
  HeroContainer,
  HeroContent,
  HeroRoot,
  HeroSubtitle,
  HeroTitle,
  MonthlyGain,
  OutlineButton,
  PremiumLabel,
  PreviewBorder,
  PreviewCard,
  PreviewHeader,
  PreviewWrap,
  PrimaryGlow,
  ProgressBar,
  ProgressBars,
  SavingsLabel,
  SavingsValue,
  ZapIcon,
} from "./styled";

export function HeroSection({ "data-testid": dataTestId }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <HeroRoot data-testid={dataTestId}>
      <GlowLayer aria-hidden="true">
        <PrimaryGlow />
        <AccentGlow />
      </GlowLayer>

      <HeroContainer>
        <HeroContent>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge>
              <Shield size={14} />
              {t("hero.badge")}
            </Badge>

            <HeroTitle>
              {t("hero.title1")} <GradientText>{t("hero.title2")}</GradientText>
              <br />
              {t("hero.title3")}
            </HeroTitle>

            <HeroSubtitle>{t("hero.subtitle")}</HeroSubtitle>

            <HeroActions>
              <Link href="/login">
                <Button variant="gradient" size="lg">
                  {t("hero.cta1")}
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <a href="#features">
                <OutlineButton size="lg" variant="outline">
                  {t("hero.cta2")}
                </OutlineButton>
              </a>
            </HeroActions>
          </motion.div>

          <HeroCardMotion initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <PreviewWrap>
              <PreviewBorder>
                <PreviewCard>
                  <PreviewHeader>
                    <PremiumLabel>{t("hero.premium")}</PremiumLabel>
                    <ZapIcon size={18} />
                  </PreviewHeader>
                  <Balance>R$ 48.629,00</Balance>
                  <MonthlyGain>{t("hero.month")}</MonthlyGain>
                  <ProgressBars aria-hidden="true">
                    <ProgressBar $tone="primaryStrong" />
                    <ProgressBar $tone="accent" />
                    <ProgressBar $tone="primarySoft" />
                  </ProgressBars>
                </PreviewCard>
              </PreviewBorder>

              <FloatingCard>
                <SavingsLabel>{t("hero.savings")}</SavingsLabel>
                <SavingsValue>{t("hero.reached")}</SavingsValue>
              </FloatingCard>
            </PreviewWrap>
          </HeroCardMotion>
        </HeroContent>
      </HeroContainer>
    </HeroRoot>
  );
}
