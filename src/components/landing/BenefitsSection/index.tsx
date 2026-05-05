"use client";

import { motion } from "framer-motion";
import { PiggyBank, TrendingUp, Wallet } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Container,
  GradientText,
  Section,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
} from "@/styles/shared";

import type { BenefitCardData, BenefitsSectionProps } from "./interface";
import {
  BenefitCard,
  BenefitContent,
  BenefitDescription,
  BenefitGrid,
  BenefitIconBox,
  BenefitOverlay,
  BenefitTitle,
} from "./styled";

export function BenefitsSection({
  "data-testid": dataTestId,
}: BenefitsSectionProps) {
  const { t } = useLanguage();

  const cards: BenefitCardData[] = [
    {
      icon: Wallet,
      title: t("benefits.fees.title"),
      desc: t("benefits.fees.desc"),
      tone: "primary",
    },
    {
      icon: TrendingUp,
      title: t("benefits.invest.title"),
      desc: t("benefits.invest.desc"),
      tone: "accent",
    },
    {
      icon: PiggyBank,
      title: t("benefits.savings.title"),
      desc: t("benefits.savings.desc"),
      tone: "mixed",
    },
  ];

  return (
    <Section id="benefits" data-testid={dataTestId}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader>
            <SectionTitle>
              {t("benefits.title1")} <GradientText>ByteBank</GradientText>
            </SectionTitle>
            <SectionSubtitle>{t("benefits.subtitle")}</SectionSubtitle>
          </SectionHeader>
        </motion.div>

        <BenefitGrid>
          {cards.map((card, index) => (
            <BenefitCard
              key={card.title}
              $tone={card.tone}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <BenefitOverlay $tone={card.tone} aria-hidden="true" />
              <BenefitContent>
                <BenefitIconBox $tone={card.tone}>
                  <card.icon size={22} />
                </BenefitIconBox>
                <BenefitTitle>{card.title}</BenefitTitle>
                <BenefitDescription>{card.desc}</BenefitDescription>
              </BenefitContent>
            </BenefitCard>
          ))}
        </BenefitGrid>
      </Container>
    </Section>
  );
}
