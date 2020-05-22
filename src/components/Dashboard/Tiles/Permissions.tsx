import React from 'react';
import { Key } from 'react-feather';
import { Route } from 'shared/UrlRoute';
import BaseTile from './BaseTile';

export const Permissions = () => {
  return (
    <BaseTile
      title='Permissions'
      icon={<Key />}
      linkTo={Route.Dashboard.Permissions}
    />
  );
};
