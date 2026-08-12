import styled from "styled-components";

export const StyledInput = styled.input`
  display: flex;
  width: 100%;
  height: 2.5rem;
  border: 1px solid hsl(var(--input));
  border-radius: calc(var(--radius) - 2px);
  background: hsl(var(--background));
  padding: 0.5rem 0.75rem;
  color: hsl(var(--foreground));
  font-size: 1rem;
  outline: none;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    opacity 160ms ease;

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

  &::file-selector-button {
    border: 0;
    background: transparent;
    color: hsl(var(--foreground));
    font: inherit;
    font-size: 0.875rem;
    font-weight: 500;
  }

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;
