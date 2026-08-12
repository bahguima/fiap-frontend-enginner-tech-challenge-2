export type QueryStateKind = "loading" | "error" | "empty";
export interface QueryStateProps {
    "data-testid"?: string;
    kind: QueryStateKind;
    title?: string;
    message: string;
    onRetry?: () => void;
}
