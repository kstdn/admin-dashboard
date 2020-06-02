import React, { ComponentProps, FC } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';
import { Tile } from './Tile';

const progressAnimation = keyframes`
  from {
    right: 100%;
  }

  to {
    right: 0;
  }
`;

const StyledTimeoutTile = styled(Tile).attrs({
  renderBorder: true,
})`
  position: relative;
  overflow: hidden;
`;

const ProgressScale = styled.div<{ duration: number }>`
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;

  ${({ duration }) => css`
    animation-fill-mode: forwards;
    animation: ${progressAnimation} ${duration}ms linear;
  `}
`;

const Content = styled.div`
  position: relative;
`;

type Props = {
  duration?: number;
} & ComponentProps<typeof Tile>;

export const ProgressTile: FC<Props> = ({
  duration = 3000,
  children,
  ...rest
}) => {
  return (
    <StyledTimeoutTile {...rest}>
      <ProgressScale duration={duration} />
      <Content>{children}</Content>
    </StyledTimeoutTile>
  );
};
