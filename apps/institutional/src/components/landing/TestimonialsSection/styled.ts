import { motion } from "framer-motion";
import { Star } from "lucide-react";
import styled from "styled-components";
import { Container, GlassSurface, Section } from "@banking/shared/ui/styles/shared";

export const TestimonialSectionRoot = styled(Section)`
  position: relative;
`;

export const TestimonialGlow = styled.div`
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(37.5rem, 100vw);
  height: 25rem;
  border-radius: 50%;
  background: hsl(var(--primary) / 0.05);
  filter: blur(150px);
  transform: translate(-50%, -50%);
`;

export const TestimonialContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

export const TestimonialGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const TestimonialCard = styled(motion.create(GlassSurface))`
  border-radius: var(--radius);
  padding: 1.5rem;
`;

export const Stars = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
`;

export const StarIcon = styled(Star)`
  color: hsl(var(--primary));
  fill: currentColor;
`;

export const Quote = styled.p`
  margin: 0 0 1.5rem;
  color: hsl(var(--secondary-foreground));
  font-size: 0.875rem;
  line-height: 1.7;
`;

export const Author = styled.div``;

export const AuthorName = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
`;

export const AuthorRole = styled.div`
  color: hsl(var(--muted-foreground));
  font-size: 0.75rem;
`;
