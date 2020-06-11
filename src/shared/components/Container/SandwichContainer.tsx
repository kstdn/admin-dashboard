import React, { ReactNode } from 'react';
import styled from 'styled-components/macro';
import { Stack } from '../Stack';

const Container = styled(Stack)`
  height: 100%;
`;

const Header = styled.div`
  flex-shrink: 0;
`;
const Content = styled.div`
  flex-grow: 1;
  overflow: auto;
`;
const Footer = styled.div`
  flex-shrink: 0;
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
    <Container gap={true} className={className}>
      { header && <Header>{header}</Header> }
      { content && <Content>{content}</Content> }
      { footer && <Footer>{footer}</Footer> }
    </Container>
  );
};

export default SandwichContainer;
