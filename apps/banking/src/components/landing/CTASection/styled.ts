import { motion } from "framer-motion";
import styled from "styled-components";
import { Button } from "@banking/shared/ui/components/button";

export const CtaCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
`;

export const CtaGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    hsl(var(--primary) / 0.2),
    hsl(var(--accent) / 0.2)
  );
`;

export const CtaBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background: hsl(var(--card) / 0.8);
  backdrop-filter: blur(24px);
`;

export const CtaContent = styled.div`
  position: relative;
  padding: 2.5rem;
  text-align: center;

  @media (min-width: 768px) {
    padding: 4rem;
  }
`;

export const CtaTitle = styled.h2`
  margin: 0 0 1rem;
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.875rem;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

export const CtaSubtitle = styled.p`
  max-width: 32rem;
  margin: 0 auto 2rem;
  color: hsl(var(--muted-foreground));
`;

export const CtaButton = styled(Button)`
  padding-inline: 2.5rem;
`;
