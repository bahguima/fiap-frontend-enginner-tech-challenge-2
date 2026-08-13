/** Resolve CSS variable (HSL triplet) to a usable hsl() string. */
export declare function hslVar(name: string, alpha?: number): string;
export declare function getChartColors(themeVersion?: string): {
    income: string;
    incomeSoft: string;
    expense: string;
    expenseSoft: string;
    grid: string;
    text: string;
    tooltipBg: string;
    tooltipBorder: string;
    tooltipText: string;
    themeClass: string;
};
