import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Authentication } from '../Auth';
import { Dashboard } from '../Dashboard';
import { PageError } from '../shared/components';

export const RoutePaths = {
  Root: '/',
  Authentication: '/authentication',
  Dashboard: '/dashboard',
};

export const Routes = () => (
  <Switch>
    <Redirect exact from={RoutePaths.Root} to={RoutePaths.Dashboard} />
    <Route path={RoutePaths.Authentication} component={Authentication} />
    <Route path={RoutePaths.Dashboard} component={Dashboard} />
    <Route component={PageError} />
  </Switch>
);
