import React, { FC } from 'react';
import styled from 'styled-components/macro';

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Overlay: FC = ({ children }) => (
  <StyledOverlay onClick={e => e.stopPropagation()}>{children}</StyledOverlay>
);
