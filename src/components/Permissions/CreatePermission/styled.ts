import styled from 'styled-components/macro';
import CrudTableComp from '../CrudTable';
import CardComp from 'shared/components/Card';

export const Card = styled(CardComp)`
  max-width: var(--content-width);
`;

export const Label = styled.div`
  font-size: var(--font-size-minus-1);
  text-transform: uppercase;
  font-weight: var(--font-weight-accent);
  letter-spacing: var(--letter-spacing);
`;

export const CrudTable = styled(CrudTableComp)`
  align-self: stretch;
`;
