import React from 'react';
import { Grid, User } from 'react-feather';
import { Props } from '.';
import { Divider } from '../../shared/components/Divider';
import { ThemeToggle } from '../../shared/components/ThemeToggle';
import { Sidebar } from '../Container/Sidebar';
import { SidebarLink } from '../Container/Sidebar/SidebarLink';
import { Route } from '../../shared/route.enum';

export const AuthenticatedSidebar = ({ theme, toggleTheme }: Props) => {
  return (
    <Sidebar>
      <SidebarLink to={Route.Dashboard} icon={<Grid />}>
        Dashboard
      </SidebarLink>
      <Divider />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <SidebarLink icon={<User />}>Logout</SidebarLink>
    </Sidebar>
  );
};
