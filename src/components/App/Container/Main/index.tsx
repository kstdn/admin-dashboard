import React, { FC } from 'react';
import styled from 'styled-components/macro';

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: var(--bg-body);
  color: var(--text-color);
  padding: var(--base-padding);

  & > *:not(:last-of-type) {
    margin-block-end: var(--base-padding);
  }
`;

export const Main: FC = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};
