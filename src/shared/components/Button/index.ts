import { ButtonHTMLAttributes, ComponentProps } from 'react';
import styled, { css } from 'styled-components/macro';
import { Tile } from '../Tile';

type Props = ButtonHTMLAttributes<ComponentProps<typeof Tile>> & {
  size?: 'small' | 'regular' | 'big';
};

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

  ${({size = 'regular', renderPadding}) => css`
    ${ renderPadding !== false && size === 'small' ? 'padding: var(--space-05);' : ''} 
    ${ renderPadding !== false && size === 'big' ? 'padding: var(--space-2);' : ''} 
  `}
`;
