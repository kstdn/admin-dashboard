import React, { ReactNode } from 'react';
import styled from 'styled-components/macro';
import { Stack } from '../Stack';

const Content = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

type Props = {
  header?: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
  className?: string;
};

/*
 * Sandwich-style Container
 * When a header and/or footer is provided, they will be always visible
 * Its content
 * - is placed between the header and footer 
 * - will stretch to fill up the available space
 * - will show a scrollbar when there isn't any space left
 */
const SandwichContainer = ({ header, content, footer, className }: Props) => {
  return (
    <Stack gap={true} className={className}>
      {header}
      <Content>{content}</Content>
      {footer}
    </Stack>
  );
};

export default SandwichContainer;
