import { motion } from "framer-motion";
import styled from "styled-components";
import { Section } from "@/styles/shared";

export const FeatureSectionRoot = styled(Section)`
  position: relative;
`;

export const FeatureGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const FeatureCard = styled(motion.div)`
  border: 1px solid hsl(var(--border) / 0.4);
  border-radius: var(--radius);
  background: hsl(var(--card) / 0.6);
  padding: 1.5rem;
  transition:
    border-color 220ms ease,
    box-shadow 220ms ease;

  &:hover {
    border-color: hsl(var(--primary) / 0.3);
    box-shadow: var(--shadow-glow);
  }
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 1rem;
  border-radius: calc(var(--radius) - 2px);
  background: hsl(var(--primary) / 0.1);
  color: hsl(var(--primary));
  transition: background-color 220ms ease;

  ${FeatureCard}:hover & {
    background: hsl(var(--primary) / 0.2);
  }
`;

export const FeatureTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
`;

export const FeatureDescription = styled.p`
  margin: 0;
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
  line-height: 1.7;
`;
