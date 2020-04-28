import React, { cloneElement } from 'react';
import { Link } from 'react-router-dom';
import ConditionalWrapper from 'shared/components/ConditionalWrapper';
import * as Styled from './styled';

type Props = {
  title: string;
  icon: JSX.Element;
  linkTo?: string;
  children?: any;
};

const BaseTile = ({ linkTo, icon, title, children }: Props) => {
  const iconBig = cloneElement(icon, { size: 48 });

  return (
    <ConditionalWrapper
      condition={!!linkTo}
      wrapper={children => <Link to={linkTo as string}>{children}</Link>}
    >
      <Styled.Tile fillContainer={true}>
        <Styled.TitleRow>
          <Styled.Title>{title}</Styled.Title>
          <Styled.Icon>{iconBig}</Styled.Icon>
        </Styled.TitleRow>
        {children}
      </Styled.Tile>
    </ConditionalWrapper>
  );
};

export default BaseTile;
