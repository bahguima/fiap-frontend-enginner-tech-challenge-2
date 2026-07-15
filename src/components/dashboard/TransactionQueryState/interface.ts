export type TransactionQueryStateType = "loading" | "error" | "empty" | "no-results";

export interface TransactionQueryStateProps {
  "data-testid"?: string;
  type: TransactionQueryStateType;
}
