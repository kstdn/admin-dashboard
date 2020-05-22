import styled from 'styled-components/macro';
import Box from '../Box';

export const Card = styled(Box)`
  padding: 0;
  overflow: hidden;
  background-color: var(--bg-secondary);
  color: var(--text-color);
`;

export const CardHeader = styled.div`
  padding: var(--base-padding);
`;

export const CardContent = styled.div`
  padding: var(--base-padding);
  overflow: auto;
`;

export const CardFooter = styled.div`
  padding: var(--base-padding);
  background-color: var(--bg-secondary-alt);
`;
