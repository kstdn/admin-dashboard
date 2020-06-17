import styled from 'styled-components/macro';
import CrudTableComp from '../CrudTable';
import CardComp from 'shared/components/Card';
import { box } from 'styles/mixins/box/box.mixin';

export const Preselected = styled.div`
  ${box()}
  border-width: var(--border-width);
  border-style: var(--border-style);
  border-radius: var(--border-radius);
`;

export const Card = styled(CardComp)`
  max-width: var(--content-width);
`;

export const CrudTable = styled(CrudTableComp)`
  align-self: stretch;
`;
