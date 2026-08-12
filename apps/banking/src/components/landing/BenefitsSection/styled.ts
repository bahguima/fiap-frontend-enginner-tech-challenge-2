import { motion } from "framer-motion";
import styled from "styled-components";

import type { BenefitTone } from "./interface";

const toneGradient = (tone: BenefitTone, opacity = 1) => {
  if (tone === "accent") {
    return `linear-gradient(135deg, hsl(var(--accent) / ${opacity}), hsl(var(--accent) / ${opacity * 0.6}))`;
  }

  if (tone === "mixed") {
    return `linear-gradient(135deg, hsl(var(--primary) / ${opacity}), hsl(var(--accent) / ${opacity}))`;
  }

  return `linear-gradient(135deg, hsl(var(--primary) / ${opacity}), hsl(var(--primary) / ${opacity * 0.6}))`;
};

export const BenefitGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const BenefitCard = styled(motion.div)<{ $tone: BenefitTone }>`
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
`;

export const BenefitOverlay = styled.div<{ $tone: BenefitTone }>`
  position: absolute;
  inset: 0;
  background: ${({ $tone }) => toneGradient($tone, 0.08)};
`;

export const BenefitContent = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  border: 1px solid hsl(var(--border) / 0.4);
  border-radius: var(--radius);
  padding: 2rem;
`;

export const BenefitIconBox = styled.div<{ $tone: BenefitTone }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  margin-bottom: 1.5rem;
  border-radius: var(--radius);
  background: ${({ $tone }) => toneGradient($tone)};
  color: hsl(var(--primary-foreground));
`;

export const BenefitTitle = styled.h3`
  margin: 0 0 0.75rem;
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const BenefitDescription = styled.p`
  margin: 0;
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
  line-height: 1.7;
`;
