import React from 'react';
import { Redirect, Route as RouteComp, Switch } from 'react-router-dom';
import { Route } from 'shared/route.enum';
import { Authentication } from '../../Auth';

export default function UnauthenticatedRoutes() {
  return (
    <Switch>
      <Redirect exact from={Route.Root} to={Route.Authentication} />
      <RouteComp path={Route.Authentication} component={Authentication} />
    </Switch>
  );
}
