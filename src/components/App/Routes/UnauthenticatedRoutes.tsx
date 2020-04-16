import React from 'react';
import { Redirect, Route as RouteComp, Switch } from 'react-router-dom';
import { PageError } from 'shared/components/PageError';
import { Route } from 'shared/route.enum';
import { Authentication } from '../../Auth';

export const UnauthenticatedRoutes = () => (
  <Switch>
    <Redirect exact from={Route.Root} to={Route.Authentication} />
    <RouteComp path={Route.Authentication} component={Authentication} />
    <RouteComp component={PageError} />
  </Switch>
);
