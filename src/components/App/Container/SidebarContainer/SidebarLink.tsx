import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components/macro';

const StyledSidebarLink = styled.div<any>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-block-start: var(--space);
`;

const IconWrapper = styled.span`
  padding-inline-end: var(--space);
  line-height: 0;
`;

const Link = styled(RouterLink)`
  display: contents;
`;

type Props = {
  icon: JSX.Element;
  children: any;
  onClick?: Function;
  to?: string;
};

const Content = ({ icon, children }: Pick<Props, 'icon' | 'children'>) => (
  <>
    <IconWrapper>{icon}</IconWrapper>
    {children}
  </>
);

export const SidebarLink: FC<Props> = ({ icon, children, onClick, to }) => (
  <StyledSidebarLink onClick={onClick}>
    {to ? (
      <Link to={to}>
        <Content icon={icon}>{children}</Content>
      </Link>
    ) : (
      <Content icon={icon}>{children}</Content>
    )}
  </StyledSidebarLink>
);
