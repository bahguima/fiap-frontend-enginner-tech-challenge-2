"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@institutional/contexts/LanguageContext";
import { GradientText, SectionHeader, SectionSubtitle, SectionTitle } from "@banking/shared/ui/styles/shared";

import type { TestimonialData, TestimonialsSectionProps } from "./interface";
import {
  Author,
  AuthorName,
  AuthorRole,
  Quote,
  StarIcon,
  Stars,
  TestimonialCard,
  TestimonialContainer,
  TestimonialGlow,
  TestimonialGrid,
  TestimonialSectionRoot,
} from "./styled";

export function TestimonialsSection({ "data-testid": dataTestId }: TestimonialsSectionProps) {
  const { t } = useLanguage();

  const testimonials: TestimonialData[] = [
    { name: t("testimonials.1.name"), role: t("testimonials.1.role"), text: t("testimonials.1.text") },
    { name: t("testimonials.2.name"), role: t("testimonials.2.role"), text: t("testimonials.2.text") },
    { name: t("testimonials.3.name"), role: t("testimonials.3.role"), text: t("testimonials.3.text") },
  ];

  return (
    <TestimonialSectionRoot id="testimonials" data-testid={dataTestId}>
      <TestimonialGlow aria-hidden="true" />

      <TestimonialContainer>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeader>
            <SectionTitle>
              {t("testimonials.title1")} <GradientText>{t("testimonials.title2")}</GradientText>
            </SectionTitle>
            <SectionSubtitle>{t("testimonials.subtitle")}</SectionSubtitle>
          </SectionHeader>
        </motion.div>

        <TestimonialGrid>
          {testimonials.map((item, index) => (
            <TestimonialCard
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Stars aria-label="5 estrelas">
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <StarIcon key={`${item.name}-${starIndex}`} size={14} />
                ))}
              </Stars>
              <Quote>“{item.text}”</Quote>
              <Author>
                <AuthorName>{item.name}</AuthorName>
                <AuthorRole>{item.role}</AuthorRole>
              </Author>
            </TestimonialCard>
          ))}
        </TestimonialGrid>
      </TestimonialContainer>
    </TestimonialSectionRoot>
  );
}
