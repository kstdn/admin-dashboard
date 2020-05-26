import { Button } from 'shared/components/Button';
import styled from 'styled-components/macro';

export const Form = styled.form`
  display: grid;
  gap: var(--space);
  padding: var(--space-2);
  background-color: var(--background-color-elevation-2);
  border-radius: var(--border-radius);
`;

export const FormLabel = styled.span`
  font-size: var(--font-size-3);
  margin-block-end: var(--space-2);
`;

export const Label = styled.label``;

export const Input = styled.input`
  display: block;
  border-radius: var(--border-radius);
  background-color: transparent;
  border: 1px solid var(--background-color);
  color: var(--text-color);
  padding: var(--space-2);
`;

export const SubmitButton = styled(Button)`
  justify-self: center;
  margin-block-start: 1.5rem;
`;
