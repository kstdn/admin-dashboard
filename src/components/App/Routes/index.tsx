import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from 'shared/components/Loader';
import { Route } from 'shared/route.enum';
import { getIsAuthSettled, getIsAuthenticated } from 'store/selectors';

const AuthenticatedRoutes = lazy(() => import('./AuthenticatedRoutes'));
const UnauthenticatedRoutes = lazy(() => import('./UnauthenticatedRoutes'));

export const Routes = () => {
  const authSettled = useSelector(getIsAuthSettled);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const Routes = isAuthenticated ? (
    <AuthenticatedRoutes />
  ) : (
    <UnauthenticatedRoutes />
  );

  return (
    <Suspense fallback={<Loader />}>
      {authSettled ? Routes : <Loader />}
      <Redirect path='*' to={Route.Root} />
    </Suspense>
  );
};
