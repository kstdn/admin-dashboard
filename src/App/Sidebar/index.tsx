import React from 'react';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../store/selectors';
import { ThemeMode } from '../useTheme';
import { AuthenticatedSidebar } from './AuthenticatedSidebar';
import { UnauthenticatedSidebar } from './UnauthenticatedSidebar';

export type Props = {
  theme: ThemeMode;
  toggleTheme: () => void;
};

export const Sidebar = (props: Props) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return isAuthenticated ? (
    <AuthenticatedSidebar {...props} />
  ) : (
    <UnauthenticatedSidebar {...props} />
  );
};
