import styled from 'styled-components/macro';
import { getBaseStyles } from './base-styles';
import { BoxProps } from './BoxProps';

const Box = styled.div<BoxProps>`
  ${props => getBaseStyles(props)}
  ${props =>
    props.fillContainer &&
    `
    height: 100%;
    width: 100%;
  `}
  ${props => props.includePadding === false && `padding: 0;`}
`;
export default Box;
