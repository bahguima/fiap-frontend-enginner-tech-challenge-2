import styled from "styled-components";

export const AttachmentsFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
  margin: 0;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  padding: 14px;
`;

export const AttachmentsLegend = styled.legend`
  padding: 0 6px;
  color: hsl(var(--foreground));
  font-size: 14px;
  font-weight: 600;
`;

export const AttachmentHint = styled.p`
  margin: 0;
  color: hsl(var(--muted-foreground));
  font-size: 12px;
`;

export const AttachmentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const AttachmentItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
  border-radius: calc(var(--radius) - 2px);
  background: hsl(var(--muted) / 0.45);
  padding: 8px 10px;
`;

export const AttachmentName = styled.span`
  overflow: hidden;
  color: hsl(var(--foreground));
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const AttachmentMeta = styled.span`
  flex-shrink: 0;
  color: hsl(var(--muted-foreground));
  font-size: 12px;
`;

export const AttachmentStatus = styled.p`
  margin: 0;
  color: hsl(var(--muted-foreground));
  font-size: 13px;
`;

export const AttachmentError = styled.p`
  margin: 0;
  color: hsl(var(--destructive));
  font-size: 12px;
`;

export const FailureList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  padding-left: 20px;
  color: hsl(var(--destructive));
  font-size: 12px;
`;

export const AttachmentActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
