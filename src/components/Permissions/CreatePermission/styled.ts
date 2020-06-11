import styled from 'styled-components/macro';
import CrudTableComp from '../CrudTable';
import CardComp from 'shared/components/Card';

export const Card = styled(CardComp)`
  max-width: var(--content-width);
`;

export const CrudTable = styled(CrudTableComp)`
  align-self: stretch;
`;
