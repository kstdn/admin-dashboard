import styled from 'styled-components/macro';
import SandwichContainer from 'shared/components/Container/SandwichContainer';

export const Container = styled(SandwichContainer)`
  align-items: stretch;
  max-width: var(--content-width);
  height: 100%;
  margin: auto;
`;

export const Scrollable = styled.div`
  overflow: auto;
  flex: 1;
`;
