import React from 'react';
import { Users } from 'react-feather';
import { Route } from 'shared/UrlRoute';
import BaseTile from './BaseTile';

export const Roles = () => {
  return (
    <BaseTile title='Roles' icon={<Users />} linkTo={Route.Dashboard.Roles} />
  );
};
