import React from 'react';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../store/selectors';
import { AuthenticatedRoutes } from './AuthenticatedRoutes';
import { UnauthenticatedRoutes } from './UnauthenticatedRoutes';

export const Routes = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return isAuthenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
};
