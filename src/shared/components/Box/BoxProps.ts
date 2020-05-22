import { Color } from 'shared/color.type';

export type BoxColorProps = {
  color?: Color;
  inverted?: boolean;
};

export type BoxProps = BoxColorProps & {
  fillContainer?: boolean;
  includePadding?: boolean;
};
