import styled from 'styled-components/macro';
import { Stack } from 'shared/components/Stack';

export const Container = styled(Stack).attrs({
  gap: true,
})`
  align-items: stretch;
  max-width: 500px;
  height: 100%;
  margin: auto;
`;

export const Scrollable = styled.div`
  overflow: auto;
  flex: 1;
`;
