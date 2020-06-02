import styled from 'styled-components/macro';
import { Button } from '../Button';
import React, { ReactNode, ComponentProps } from 'react';

const StyledIconButton = styled(Button)`
  line-height: 0;

  & > * {
    width: var(--font-size);
    height: var(--font-size);
  }
`;

type Props = {
  icon: ReactNode;
} & ComponentProps<typeof StyledIconButton>;

export const IconButton = ({ icon, ...rest }: Props) => (
  <StyledIconButton {...rest}>{icon}</StyledIconButton>
);
