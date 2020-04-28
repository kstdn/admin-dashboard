import React from 'react';
import { User } from 'react-feather';
import BaseTile from './BaseTile';
import { Route } from 'shared/UrlRoute';

export const Users = () => {
  return <BaseTile title='Users' icon={<User />} linkTo={Route.Dashboard.Users}/>;
};
