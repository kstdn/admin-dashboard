import React, { FC } from 'react';
import { Moon, Sun } from 'react-feather';
import { ThemeMode } from '../../useTheme';
import { SidebarLink } from './SidebarLink';

type Props = {
  theme: ThemeMode;
  onToggle: Function;
};

export const ThemeToggle: FC<Props> = ({ children, ...props }) => {
  const isLight = props.theme === 'light';
  return (
    <SidebarLink icon={isLight ? <Sun /> : <Moon />} onClick={props.onToggle}>
      {isLight ? 'Light' : 'Dark'}
    </SidebarLink>
  );
};
