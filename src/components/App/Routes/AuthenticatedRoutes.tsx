import Permissions from 'components/Permissions';
import CreatePermission from 'components/Permissions/CreatePermission';
import Users from 'components/Users';
import React from 'react';
import { Redirect, Route as RouteComp, Switch } from 'react-router-dom';
import { Route } from 'shared/UrlRoute';
import { Dashboard } from '../../Dashboard';
import Roles from 'components/Roles';

export default function AuthenticatedRoutes() {
  return (
    <Switch>
      <Redirect exact from={Route.Root} to={Route.Dashboard.Root} />
      <RouteComp exact path={Route.Dashboard.Root} component={Dashboard} />
      <RouteComp path={Route.Dashboard.Users} component={Users} />
      <RouteComp path={Route.Dashboard.Roles} component={Roles} />
      <RouteComp exact path={Route.Dashboard.Permissions} component={Permissions} />
      <RouteComp path={Route.Dashboard.PermissionsNew} component={CreatePermission} />
    </Switch>
  );
}
