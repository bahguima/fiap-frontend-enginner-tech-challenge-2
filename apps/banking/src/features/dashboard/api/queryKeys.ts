export interface DashboardQueryKeys {
  all: readonly ["dashboard"];
  summary: () => readonly ["dashboard", "summary"];
  monthly: () => readonly ["dashboard", "monthly"];
  profile: () => readonly ["dashboard", "profile"];
}

export const dashboardQueryKeys: DashboardQueryKeys = {
  all: ["dashboard"],
  summary: () => ["dashboard", "summary"],
  monthly: () => ["dashboard", "monthly"],
  profile: () => ["dashboard", "profile"],
};
