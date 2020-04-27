import styled from 'styled-components/macro';
import { getBaseStyles } from './base-styles';
import { BoxProps } from './BoxProps';

const Box = styled.div<BoxProps>`
  ${props => getBaseStyles(props)}
`;
export default Box;
