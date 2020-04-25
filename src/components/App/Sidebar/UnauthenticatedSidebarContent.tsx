import React from 'react';
import { User } from 'react-feather';
import { Divider } from 'shared/components/Divider';
import { Route } from 'shared/route.enum';
import { Props } from '.';
import { SidebarLink } from '../Container/SidebarContainer/SidebarLink';
import { ThemeToggle } from '../Container/SidebarContainer/ThemeToggle';

export const UnauthenticatedSidebarContent = ({
  theme,
  toggleTheme,
}: Props) => {
  return (
    <>
      <SidebarLink to={Route.Authentication} icon={<User />}>
        Login
      </SidebarLink>
      <Divider />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
    </>
  );
};
