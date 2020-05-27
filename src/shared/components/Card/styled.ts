import styled from 'styled-components/macro';
import { box } from 'styles/mixins/box/box.mixin';

export const Card = styled.div`
  ${box(false, false)}
  box-shadow: var(--shadow);
  overflow: hidden;
  background-color: var(--background-color-elevation-2);
  color: var(--text-color);
`;

export const CardHeader = styled.div`
  padding: var(--space-2);
`;

export const CardContent = styled.div`
  padding: var(--space-2);
  overflow: auto;
`;

export const CardFooter = styled.div`
  padding: var(--space-2);
`;
