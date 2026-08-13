import styled from "styled-components";
import { Panel } from "@banking/shared/ui/styles/shared";

export const StatePanel = styled(Panel)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 112px;
  padding: 24px;
  color: hsl(var(--muted-foreground));
  text-align: center;
`;

export const StateMessage = styled.p`
  margin: 0;
`;

export const StateTitle = styled.h2`
  margin: 0;
  color: hsl(var(--foreground));
  font-size: 18px;
`;
