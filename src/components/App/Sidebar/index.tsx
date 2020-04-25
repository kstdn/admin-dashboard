import React from 'react';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from 'store/selectors';
import { SidebarContainer } from '../Container/SidebarContainer';
import { ThemeMode } from '../useTheme';
import { AuthenticatedSidebarContent } from './AuthenticatedSidebarContent';
import { UnauthenticatedSidebarContent } from './UnauthenticatedSidebarContent';

export type Props = {
  theme: ThemeMode;
  toggleTheme: () => void;
};

export const Sidebar = (props: Props) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <SidebarContainer>
      {isAuthenticated ? (
        <AuthenticatedSidebarContent {...props} />
      ) : (
        <UnauthenticatedSidebarContent {...props} />
      )}
    </SidebarContainer>
  );
};
