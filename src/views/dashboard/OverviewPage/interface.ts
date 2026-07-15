import type { LucideIcon } from "lucide-react";

export type StatTone = "primary" | "success" | "accent";

export interface StatCardData {
  color: StatTone;
  icon: LucideIcon;
  label: string;
  value: string;
}
