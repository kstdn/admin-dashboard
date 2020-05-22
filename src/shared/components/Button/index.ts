import { ButtonHTMLAttributes } from 'react';
import Box from 'shared/components/Box';
import { BoxProps } from '../Box/BoxProps';
import styled from 'styled-components/macro';

export const Button = styled(Box).attrs(_ => ({
  as: 'button',
}))<ButtonHTMLAttributes<BoxProps>>`
  border: 0;
  text-transform: uppercase;

  &[disabled] {
    background-color: var(--neutral);
    color: var(--neutral-contrast);
  }
`;
