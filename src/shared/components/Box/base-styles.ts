import { Color } from './../../color.type';
import { BoxProps } from './BoxProps';

const getBgColor = (color: Color, inverted: boolean) =>
  !inverted ? color : `${color}-contrast`;
const getTextColor = (color: Color, inverted: boolean) =>
  !inverted ? `${color}-contrast` : color;

const fallback: Color = 'primary';

const defineVariables = (props: BoxProps) => `
  --bg: var(--${getBgColor(props.color || fallback, props.inverted || false)});
  --text: var(--${getTextColor(
    props.color || fallback,
    props.inverted || false,
  )});
`;

export const getBaseStyles = (props: BoxProps) => `
  ${defineVariables(props)}

  background-color: var(--bg);
  color: var(--text);
  padding: var(--base-padding);
  border-radius: var(--base-border-radius);
`;
