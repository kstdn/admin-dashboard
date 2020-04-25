import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Route } from 'shared/route.enum';
import { getIsAuthenticated } from 'store/selectors';

const AuthenticatedRoutes = lazy(() => import('./AuthenticatedRoutes'));
const UnauthenticatedRoutes = lazy(() => import('./UnauthenticatedRoutes'));

export const Routes = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isAuthenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
      <Redirect path='*' to={Route.Root} />
    </Suspense>
  );
};
