import React, { FC } from 'react';
import styled from 'styled-components/macro';

const StyledMain = styled.main`
  flex: 1;
  background: var(--bg-body);
  color: var(--text-color);
  padding: var(--base-padding);
`;

export const Main: FC = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};
