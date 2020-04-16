import React from 'react';
import { Redirect, Route as RouteComp, Switch } from 'react-router-dom';
import { PageError } from 'shared/components';
import { Authentication } from '../../Auth';
import { Route } from '../../shared/route.enum';

export const UnauthenticatedRoutes = () => (
  <Switch>
    <Redirect exact from={Route.Root} to={Route.Authentication} />
    <RouteComp path={Route.Authentication} component={Authentication} />
    <RouteComp component={PageError} />
  </Switch>
);
