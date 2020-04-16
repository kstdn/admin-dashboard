import React from 'react';
import { Grid, User } from 'react-feather';
import { Props } from '.';
import { Divider } from 'shared/components/Divider';
import { Route } from 'shared/route.enum';
import { Sidebar } from '../Container/Sidebar';
import { SidebarLink } from '../Container/Sidebar/SidebarLink';
import { ThemeToggle } from '../Container/Sidebar/ThemeToggle';

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
