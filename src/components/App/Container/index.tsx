import React, { FC } from 'react';
import styled from 'styled-components/macro';

const StyledContainer = styled.div`
  display: flex;
  height: 100%;
`;

export const Container: FC = ({ children, ...props }) => {
  return <StyledContainer>{children}</StyledContainer>;
};
