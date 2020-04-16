import React from 'react';
import { Redirect, Route as RouteComp, Switch } from 'react-router-dom';
import { PageError } from 'shared/components/PageError';
import { Route } from 'shared/route.enum';
import { Dashboard } from '../../Dashboard';

export const AuthenticatedRoutes = () => (
  <Switch>
    <Redirect exact from={Route.Root} to={Route.Dashboard} />
    <RouteComp path={Route.Dashboard} component={Dashboard} />
    <RouteComp component={PageError} />
  </Switch>
);
