import React from 'react';
import { Redirect, Route as RouteComp, Switch } from 'react-router-dom';
import { Dashboard } from '../../Dashboard';
import { PageError } from '../../shared/components';
import { Route } from '../../shared/route.enum';

export const AuthenticatedRoutes = () => (
  <Switch>
    <Redirect exact from={Route.Root} to={Route.Dashboard} />
    <RouteComp path={Route.Dashboard} component={Dashboard} />
    <RouteComp component={PageError} />
  </Switch>
);
