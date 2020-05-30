import React, { FC } from 'react';
import { Stack } from 'shared/components/Stack';
import styled from 'styled-components/macro';

const StyledMain = styled(Stack).attrs({
  as: 'main',
  gap: true,
  gapSize: 2,
})`
  flex: 1;
  background: var(--background-color);
  color: var(--text-color);
  padding: var(--space-2);
`;

export const Main: FC = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};
