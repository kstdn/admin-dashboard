import React from 'react';
import { User } from 'react-feather';
import { useDispatch } from 'react-redux';
import { logout } from 'store/actions';
import { SidebarLink } from './SidebarLink';

export const Logout = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <SidebarLink icon={<User />} onClick={handleClick}>
      Logout
    </SidebarLink>
  );
};
