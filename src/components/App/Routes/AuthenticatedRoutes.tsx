import Users from 'components/Users';
import React from 'react';
import { Redirect, Route as RouteComp, Switch } from 'react-router-dom';
import { Route } from 'shared/UrlRoute';
import { Dashboard } from '../../Dashboard';

export default function AuthenticatedRoutes() {
  return (
    <Switch>
      <Redirect exact from={Route.Root} to={Route.Dashboard.Root} />
      <RouteComp exact path={Route.Dashboard.Root} component={Dashboard} />
      <RouteComp path={Route.Dashboard.Users} component={Users} />
    </Switch>
  );
}
