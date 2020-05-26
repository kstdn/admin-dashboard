import React, { ComponentProps } from 'react';
import * as Styled from './styled';
import { Tile } from '../Tile';

type Props = {
  header?: JSX.Element;
  content: JSX.Element;
  footer?: JSX.Element;
} & ComponentProps<typeof Tile>;

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
