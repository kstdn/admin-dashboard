import React, { ComponentProps } from 'react';
import { Loader } from 'react-feather';
import styled from 'styled-components/macro';
import { Button } from '../Button';
import { Overlay } from '../Overlay';

type Props = {
  isLoading?: boolean;
} & ComponentProps<typeof Button>;

const StyledButton = styled(Button)`
  position: relative;
`;

const ActionButton = ({
  isLoading = false,
  children,
  ...buttonProps
}: Props) => {
  return (
    <StyledButton {...buttonProps}>
      {isLoading && (
        <Overlay>
          <Loader />
        </Overlay>
      )}
      {children}
    </StyledButton>
  );
};

export default ActionButton;
