import styled from "styled-components";

export const FiltersForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border: 1px solid hsl(var(--border) / 0.5);
  border-radius: var(--radius);
  background: hsl(var(--card) / 0.6);
`;

export const FiltersTitle = styled.h2`
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  font-size: 18px;
  font-weight: 600;
`;

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const WideField = styled(Field)`
  @media (min-width: 768px) {
    grid-column: span 2;
  }
`;

export const FieldLabel = styled.label`
  color: hsl(var(--foreground));
  font-size: 14px;
  font-weight: 500;
`;

export const Fieldset = styled.fieldset`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;

  @media (min-width: 768px) {
    grid-column: span 2;
  }
`;

export const FieldsetLegend = styled.legend`
  grid-column: 1 / -1;
  margin-bottom: 8px;
  padding: 0;
  color: hsl(var(--foreground));
  font-size: 14px;
  font-weight: 500;
`;

export const NativeSelect = styled.select`
  width: 100%;
  height: 40px;
  border: 1px solid hsl(var(--input));
  border-radius: calc(var(--radius) - 2px);
  background: hsl(var(--background));
  padding: 8px 12px;
  color: hsl(var(--foreground));
  font: inherit;
  font-size: 14px;
  outline: none;

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

export const FilterActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
`;
