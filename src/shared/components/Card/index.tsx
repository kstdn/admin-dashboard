import React from 'react';
import { BoxProps } from 'shared/components/Box/BoxProps';
import * as Styled from './styled';

type Props = {
  header?: JSX.Element;
  content: JSX.Element;
  footer?: JSX.Element;
} & BoxProps;

const Card = ({ header, content, footer, ...boxProps }: Props) => {
  return (
    <Styled.Card>
      {header && <Styled.CardHeader {...boxProps}>{header}</Styled.CardHeader>}
      {content && <Styled.CardContent>{content}</Styled.CardContent>}
      {footer && <Styled.CardFooter {...boxProps}>{footer}</Styled.CardFooter>}
    </Styled.Card>
  );
};

export default Card;
