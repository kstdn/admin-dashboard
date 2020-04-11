import React, { FC } from 'react';
import { ThemeMode } from '../../../App/useTheme';
import { SidebarLink } from '../../../App/Container/Sidebar/SidebarLink';
import { Sun, Moon } from 'react-feather';

type Props = {
  theme: ThemeMode;
  onToggle: Function;
};

export const ThemeToggle: FC<Props> = ({ children, ...props }) => {
  const isLight = props.theme === 'light';
  return (
    <SidebarLink icon={isLight ? <Sun /> : <Moon />} onClick={props.onToggle}>
      { isLight ? 'Dark Mode' : 'Light Mode' }
    </SidebarLink>
  );
};
