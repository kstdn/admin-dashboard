import React from 'react';
import { User } from 'react-feather';
import { Props } from '.';
import { Divider } from '../../shared/components/Divider';
import { ThemeToggle } from '../../shared/components/ThemeToggle';
import { Route } from '../../shared/route.enum';
import { Sidebar } from '../Container/Sidebar';
import { SidebarLink } from '../Container/Sidebar/SidebarLink';

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
