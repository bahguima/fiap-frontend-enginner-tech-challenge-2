import styled from "styled-components";

export const SlotRoot = styled.section`
  min-width: 0;
`;

export const LoadingStatus = styled.p`
  margin: 0;
  padding: 16px 0;
`;

export const FailureContainer = styled.div`
  display: grid;
  gap: 8px;
  padding: 16px 0;
`;

export const FailureMessage = styled.p`
  margin: 0;
`;

export const RetryButton = styled.button`
  width: fit-content;
  padding: 8px 12px;
  font: inherit;
`;
