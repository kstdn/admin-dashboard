import { Button } from 'shared/components/Button';
import styled from 'styled-components/macro';

export const Form = styled.form`
  display: grid;
  gap: var(--base-padding);
  padding: var(--base-padding-big);
  background-color: var(--primary);
  border-radius: var(--base-border-radius);
`;

export const FormLabel = styled.span`
  font-size: 1.5rem;
  margin-block-end: 1.5rem;
`;

export const Label = styled.label``;

export const Input = styled.input`
  display: block;
  border-radius: var(--base-border-radius);
  background-color: transparent;
  border: 1px solid var(--bg-body);
  color: var(--text-color);
  padding: var(--base-padding);
`;

export const SubmitButton = styled(Button)`
  justify-self: center;
  margin-block-start: 1.5rem;
`;
