import styled from "styled-components";

export const Skeleton = styled.div`
  border-radius: calc(var(--radius) - 2px);
  background: hsl(var(--muted));
  animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;
