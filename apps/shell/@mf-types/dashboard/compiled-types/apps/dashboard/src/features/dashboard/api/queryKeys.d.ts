export interface DashboardQueryKeys {
    all: readonly ["dashboard"];
    home: () => readonly ["dashboard", "home"];
    summary: () => readonly ["dashboard", "summary"];
    monthly: () => readonly ["dashboard", "monthly"];
    profile: () => readonly ["dashboard", "profile"];
}
export declare const dashboardQueryKeys: DashboardQueryKeys;
