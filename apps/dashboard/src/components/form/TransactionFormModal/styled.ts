import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 24px;
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 14px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FieldError = styled.p`
  min-height: 16px;
  margin: 0;
  color: hsl(var(--destructive));
  font-size: 12px;
`;

export const Textarea = styled.textarea`
  display: flex;
  width: 100%;
  min-height: 96px;
  resize: vertical;
  border: 1px solid hsl(var(--input));
  border-radius: calc(var(--radius) - 2px);
  background: hsl(var(--background));
  padding: 8px 12px;
  color: hsl(var(--foreground));
  font: inherit;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }

  &:focus-visible {
    box-shadow:
      0 0 0 2px hsl(var(--background)),
      0 0 0 4px hsl(var(--ring));
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const CharacterCounter = styled.span`
  align-self: flex-end;
  color: hsl(var(--muted-foreground));
  font-size: 12px;
`;

export const PartialSubmissionStatus = styled.p`
  margin: 0;
  border: 1px solid hsl(var(--destructive) / 0.45);
  border-radius: calc(var(--radius) - 2px);
  background: hsl(var(--destructive) / 0.08);
  padding: 10px 12px;
  color: hsl(var(--foreground));
  font-size: 13px;
`;
