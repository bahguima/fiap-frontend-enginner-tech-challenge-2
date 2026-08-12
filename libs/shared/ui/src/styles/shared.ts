"use client";

import styled from "styled-components";

export const PageRoot = styled.div`
  min-height: 100vh;
`;

export const Container = styled.div`
  width: min(100% - 2rem, 1200px);
  margin: 0 auto;

  @media (min-width: 1536px) {
    width: min(100% - 4rem, 1400px);
  }
`;

export const GradientText = styled.span`
  color: hsl(var(--primary));
`;

export const BrandLinkText = styled.span`
  color: hsl(var(--primary));
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
`;

export const Section = styled.section`
  padding: 6rem 0;

  @media (min-width: 768px) {
    padding: 8rem 0;
  }
`;

export const SectionHeader = styled.div`
  margin-bottom: 4rem;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 1rem;
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.15;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

export const SectionSubtitle = styled.p`
  max-width: 36rem;
  margin: 0 auto;
  color: hsl(var(--muted-foreground));
`;

export const GlassSurface = styled.div`
  border: 1px solid hsl(var(--border) / 0.5);
  background: hsl(var(--card) / 0.6);
  backdrop-filter: blur(24px);
`;

export const Panel = styled.div`
  border: 1px solid hsl(var(--border) / 0.4);
  border-radius: var(--radius);
  background: hsl(var(--card) / 0.6);
`;

export const PageStack = styled.div<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap = "2rem" }) => $gap};
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

export const PageSubtitle = styled.p`
  margin: 0.25rem 0 0;
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
`;

export const CardTitle = styled.h2`
  margin: 0 0 1rem;
  font-family: "Space Grotesk", sans-serif;
  font-weight: 600;
`;

export const ChartBox = styled.div<{ $height: string }>`
  height: ${({ $height }) => $height};
`;

export const IconButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const VisuallyHiddenTable = styled.table`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
`;
