import styled from 'styled-components/macro';
import { Flex } from './Flex';

export const Stack = styled(Flex).attrs({
  direction: 'column'
})`
  align-items: flex-start;
`;
