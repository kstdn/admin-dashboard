import styled from 'styled-components/macro';
import { box } from 'styles/mixins/box/box.mixin';
import { BoxProps } from 'styles/mixins/box/box.props';
import { ColorProps } from 'styles/mixins/color/color.props';
import { color } from 'styles/mixins/color/color.mixin';

export const Tile = styled.div<ColorProps & BoxProps>`
  ${props => box(props.fillContainer, props.renderPadding, props.renderBorder)}
  ${props => color(props.color, props.inverted)}
`;
