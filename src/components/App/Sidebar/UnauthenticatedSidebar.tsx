import React from 'react';
import { User } from 'react-feather';
import { Divider } from 'shared/components/Divider';
import { Route } from 'shared/route.enum';
import { Props } from '.';
import { Sidebar } from '../Container/Sidebar';
import { SidebarLink } from '../Container/Sidebar/SidebarLink';
import { ThemeToggle } from '../Container/Sidebar/ThemeToggle';

export const UnauthenticatedSidebar = ({ theme, toggleTheme }: Props) => {
  return (
    <Sidebar>
      <SidebarLink to={Route.Authentication} icon={<User />}>
        Login
      </SidebarLink>
      <Divider />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
    </Sidebar>
  );
};
