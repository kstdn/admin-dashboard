import { Color } from './color.type';
import { ColorProps } from './color.props';
import { css } from 'styled-components/macro';

const getBgColor = (color: Color, inverted: boolean) =>
  !inverted ? color : `${color}-contrast`;
const getBgHoverColor = (color: Color, inverted: boolean) =>
  !inverted ? `${color}-hover` : `${color}-contrast`;
const getTextColor = (color: Color, inverted: boolean) =>
  !inverted ? `${color}-contrast` : color;

const fallback: Color = 'primary';

const defineVariables = (props: ColorProps) => `
  --main: var(--${getBgColor(
    props.color || fallback,
    props.inverted || false,
  )});
  --main-hover: var(--${getBgHoverColor(
    props.color || fallback,
    props.inverted || false,
  )});
  --secondary: var(--${getTextColor(
    props.color || fallback,
    props.inverted || false,
  )});
`;

export const color = (color?: Color, inverted?: boolean, forceActive?: boolean) => css`
  ${defineVariables({ color, inverted })}

  background-color: var(--main);
  color: var(--secondary);
  border-color: var(--main);

  &:hover, &:focus, &:active {
    background-color: var(--main-hover);
    border-color: var(--main-hover);
  }

  ${forceActive && 'background-color: var(--main-hover); border-color: var(--main-hover);'}
`;
