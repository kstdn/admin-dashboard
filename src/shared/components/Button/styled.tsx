import styled from 'styled-components/macro';

export type Color = 'primary' | 'accent' | 'neutral' | 'success' | 'danger';

export type Props = {
  color?: Color;
  inverted?: boolean;
};

const getBgColor = (color: Color, inverted: boolean) =>
  !inverted ? color : `${color}-contrast`;
const getTextColor = (color: Color, inverted: boolean) =>
  !inverted ? `${color}-contrast` : color;

const fallback: Color = 'primary';

const defineVariables = (props: Props) => `
  --bg: var(--${getBgColor(props.color || fallback, props.inverted || false)});
  --text: var(--${getTextColor(
    props.color || fallback,
    props.inverted || false,
  )});
`;

export const Button = styled.button<Props>`
  ${props => defineVariables(props)}

  background-color: var(--bg);
  color: var(--text);
  padding: var(--base-padding);
  border: 0;
  text-transform: uppercase;
  border-radius: var(--base-border-radius);
`;
