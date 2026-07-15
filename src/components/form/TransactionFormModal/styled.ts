import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-top: 1.5rem;
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 0.875rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FieldError = styled.p`
  min-height: 1rem;
  margin: 0;
  color: hsl(var(--destructive));
  font-size: 0.75rem;
`;

export const FieldHint = styled.p`
  margin: 0;
  color: hsl(var(--muted-foreground));
  font-size: 0.75rem;
`;
