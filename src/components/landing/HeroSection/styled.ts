import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { Container, GlassSurface } from "@/styles/shared";

import type { ProgressBarTone } from "./interface";

export const HeroRoot = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
  padding-top: 4rem;
`;

export const GlowLayer = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
`;

const GlowBase = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  animation: pulse-glow 3s ease-in-out infinite;
`;

export const PrimaryGlow = styled(GlowBase)`
  top: 25%;
  left: 25%;
  width: 24rem;
  height: 24rem;
  background: hsl(var(--primary) / 0.1);
`;

export const AccentGlow = styled(GlowBase)`
  right: 25%;
  bottom: 25%;
  width: 20rem;
  height: 20rem;
  background: hsl(var(--accent) / 0.1);
  animation-delay: 1.5s;
`;

export const HeroContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

export const HeroContent = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  text-align: center;
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border: 1px solid hsl(var(--border) / 0.5);
  border-radius: var(--radius);
  background: hsl(var(--card) / 0.4);
  color: hsl(var(--muted-foreground));
  backdrop-filter: blur(4px);
  padding: 0.375rem 1rem;
  font-size: 0.75rem;

  svg {
    color: hsl(var(--primary));
  }
`;

export const HeroTitle = styled.h1`
  margin: 0 0 1.5rem;
  font-family: "Space Grotesk", sans-serif;
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.1;

  @media (min-width: 640px) {
    font-size: 3rem;
  }

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

export const HeroSubtitle = styled.p`
  max-width: 42rem;
  margin: 0 auto 2.5rem;
  color: hsl(var(--muted-foreground));
  font-size: 1.125rem;
  line-height: 1.7;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const HeroActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

export const OutlineButton = styled(Button)`
  border-color: hsl(var(--border) / 0.5);

  &:hover {
    background: hsl(var(--card) / 0.5);
  }
`;

export const HeroCardMotion = styled(motion.div)`
  position: relative;
  margin-top: 4rem;

  @media (min-width: 768px) {
    margin-top: 6rem;
  }
`;

export const PreviewWrap = styled.div`
  position: relative;
  max-width: 32rem;
  margin: 0 auto;
`;

export const PreviewBorder = styled.div`
  border-radius: var(--radius);
  background: linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--accent) / 0.2));
  padding: 1px;
`;

export const PreviewCard = styled.div`
  border-radius: var(--radius);
  background: hsl(var(--card));
  padding: 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const PremiumLabel = styled.span`
  color: hsl(var(--muted-foreground));
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.875rem;
`;

export const ZapIcon = styled(Zap)`
  color: hsl(var(--primary));
`;

export const Balance = styled.div`
  margin-bottom: 0.5rem;
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.875rem;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

export const MonthlyGain = styled.p`
  margin: 0;
  color: hsl(var(--success));
  font-size: 0.875rem;
`;

export const ProgressBars = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

export const ProgressBar = styled.div<{ $tone: ProgressBarTone }>`
  flex: 1;
  height: 0.25rem;
  border-radius: calc(var(--radius) - 4px);
  background: ${({ $tone }) => {
    if ($tone === "accent") return "hsl(var(--accent) / 0.4)";
    if ($tone === "primarySoft") return "hsl(var(--primary) / 0.2)";
    return "hsl(var(--primary) / 0.4)";
  }};
`;

export const FloatingCard = styled(GlassSurface)`
  position: absolute;
  top: -1rem;
  right: -1rem;
  border-radius: var(--radius);
  box-shadow: 0 10px 15px hsl(var(--foreground) / 0.1);
  padding: 1rem;
  animation: float 6s ease-in-out infinite;

  @media (min-width: 768px) {
    right: -3rem;
  }
`;

export const SavingsLabel = styled.div`
  margin-bottom: 0.25rem;
  color: hsl(var(--muted-foreground));
  font-size: 0.75rem;
`;

export const SavingsValue = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
`;
