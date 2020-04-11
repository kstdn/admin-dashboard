import React from 'react';
import { Redirect, Route as RouteComp, Switch } from 'react-router-dom';
import { Authentication } from '../Auth';
import { Dashboard } from '../Dashboard';
import { PageError } from '../shared/components';

export const Route = {
  Root: '/',
  Authentication: '/authentication',
  Dashboard: '/dashboard',
};

export const Routes = () => (
  <Switch>
    <Redirect exact from={Route.Root} to={Route.Dashboard} />
    <RouteComp path={Route.Authentication} component={Authentication} />
    <RouteComp path={Route.Dashboard} component={Dashboard} />
    <RouteComp component={PageError} />
  </Switch>
);
