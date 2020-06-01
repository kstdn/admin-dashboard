import React, { ComponentProps } from 'react';
import * as Styled from './styled';
import { Tile } from '../Tile';

type Props = {
  header?: JSX.Element;
  content: JSX.Element;
  footer?: JSX.Element;
  className?: string;
} & ComponentProps<typeof Tile>;

const Card = ({ header, content, footer, className, ...tileProps }: Props) => {
  return (
    <Styled.Card className={className}>
      {header && <Styled.CardHeader {...tileProps}>{header}</Styled.CardHeader>}
      {content && <Styled.CardContent>{content}</Styled.CardContent>}
      {footer && <Styled.CardFooter {...tileProps}>{footer}</Styled.CardFooter>}
    </Styled.Card>
  );
};

export default Card;
