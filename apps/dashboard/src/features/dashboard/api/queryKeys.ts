export interface DashboardQueryKeys {
  all: readonly ["dashboard"];
  home: () => readonly ["dashboard", "home"];
  summary: () => readonly ["dashboard", "summary"];
  monthly: () => readonly ["dashboard", "monthly"];
  profile: () => readonly ["dashboard", "profile"];
}

export const dashboardQueryKeys: DashboardQueryKeys = {
  all: ["dashboard"],
  home: () => ["dashboard", "home"],
  summary: () => ["dashboard", "summary"],
  monthly: () => ["dashboard", "monthly"],
  profile: () => ["dashboard", "profile"],
};
