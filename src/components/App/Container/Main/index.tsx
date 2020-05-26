import React, { FC } from 'react';
import styled from 'styled-components/macro';

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: var(--background-color);
  color: var(--text-color);
  padding: var(--space-2);

  & > *:not(:last-of-type) {
    margin-block-end: var(--space);
  }
`;

export const Main: FC = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};
