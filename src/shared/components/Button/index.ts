import { ButtonHTMLAttributes, ComponentProps } from 'react';
import styled from 'styled-components/macro';
import { Tile } from '../Tile';

type Props = ButtonHTMLAttributes<ComponentProps<typeof Tile>>;

export const Button = styled(Tile).attrs(_ => ({
  as: 'button',
  renderBorder: true
}))<Props>`
  text-transform: uppercase;
  font-size: var(--font-size);
  line-height: var(--font-size);
  
  &[disabled] {
    pointer-events: none;
    opacity: 0.5;
  }
`;
