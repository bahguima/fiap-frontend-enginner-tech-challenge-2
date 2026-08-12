"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@banking/shared/ui/styles/shared";
import { useLanguage } from "@/contexts/LanguageContext";

import type { CTASectionProps } from "./interface";
import { CtaBackdrop, CtaButton, CtaCard, CtaContent, CtaGradient, CtaSubtitle, CtaTitle } from "./styled";

export function CTASection({ "data-testid": dataTestId }: CTASectionProps) {
  const { t } = useLanguage();

  return (
    <Section data-testid={dataTestId}>
      <Container>
        <CtaCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <CtaGradient aria-hidden="true" />
          <CtaBackdrop aria-hidden="true" />
          <CtaContent>
            <CtaTitle>{t("cta.title")}</CtaTitle>
            <CtaSubtitle>{t("cta.subtitle")}</CtaSubtitle>
            <CtaButton asChild size="lg" variant="gradient">
              <Link href="/login">
                {t("cta.button")}
                <ArrowRight size={18} />
              </Link>
            </CtaButton>
          </CtaContent>
        </CtaCard>
      </Container>
    </Section>
  );
}
