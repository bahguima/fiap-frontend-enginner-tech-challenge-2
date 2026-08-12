"use client";

import { motion } from "framer-motion";
import { BarChart3, CreditCard, Lock, Repeat, Shield, Smartphone } from "lucide-react";
import { useLanguage } from "@institutional/contexts/LanguageContext";
import { Container, GradientText, SectionHeader, SectionSubtitle, SectionTitle } from "@banking/shared/ui/styles/shared";

import type { FeaturesSectionProps } from "./interface";
import {
  FeatureCard,
  FeatureDescription,
  FeatureGrid,
  FeatureSectionRoot,
  FeatureTitle,
  IconBox,
} from "./styled";

export function FeaturesSection({ "data-testid": dataTestId }: FeaturesSectionProps) {
  const { t } = useLanguage();

  const features = [
    { icon: Shield, title: t("features.security.title"), desc: t("features.security.desc") },
    { icon: BarChart3, title: t("features.insights.title"), desc: t("features.insights.desc") },
    { icon: CreditCard, title: t("features.cards.title"), desc: t("features.cards.desc") },
    { icon: Repeat, title: t("features.transfers.title"), desc: t("features.transfers.desc") },
    { icon: Lock, title: t("features.privacy.title"), desc: t("features.privacy.desc") },
    { icon: Smartphone, title: t("features.mobile.title"), desc: t("features.mobile.desc") },
  ];

  return (
    <FeatureSectionRoot id="features" data-testid={dataTestId}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeader>
            <SectionTitle>
              {t("features.title1")} <GradientText>{t("features.title2")}</GradientText>
            </SectionTitle>
            <SectionSubtitle>{t("features.subtitle")}</SectionSubtitle>
          </SectionHeader>
        </motion.div>

        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <IconBox>
                <feature.icon size={20} />
              </IconBox>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.desc}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </Container>
    </FeatureSectionRoot>
  );
}
