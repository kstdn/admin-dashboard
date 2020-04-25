import React from 'react';
import { Grid } from 'react-feather';
import { Divider } from 'shared/components/Divider';
import { Route } from 'shared/route.enum';
import { Props } from '.';
import { Logout } from '../Container/SidebarContainer/Logout';
import { SidebarLink } from '../Container/SidebarContainer/SidebarLink';
import { ThemeToggle } from '../Container/SidebarContainer/ThemeToggle';

export const AuthenticatedSidebarContent = ({ theme, toggleTheme }: Props) => {
  return (
    <>
      <SidebarLink to={Route.Dashboard} icon={<Grid />}>
        Dashboard
      </SidebarLink>
      <Divider />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <Logout />
    </>
  );
};
