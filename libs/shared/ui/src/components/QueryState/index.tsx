"use client";

import { Button } from "@banking/shared/ui/components/button";
import type { QueryStateProps } from "./interface";
import { StateMessage, StatePanel, StateTitle } from "./styled";

export function QueryState({
  "data-testid": dataTestId,
  kind,
  title,
  message,
  onRetry,
}: QueryStateProps) {
  return (
    <StatePanel
      data-testid={dataTestId}
      role={kind === "error" ? "alert" : "status"}
    >
      {title && <StateTitle>{title}</StateTitle>}
      <StateMessage>{message}</StateMessage>
      {kind === "error" && onRetry && (
        <Button type="button" variant="outline" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </StatePanel>
  );
}
