import type { LucideIcon } from "lucide-react";

export type BenefitTone = "primary" | "accent" | "mixed";

export interface BenefitsSectionProps {
  "data-testid"?: string;
}

export interface BenefitCardData {
  icon: LucideIcon;
  title: string;
  desc: string;
  tone: BenefitTone;
}
