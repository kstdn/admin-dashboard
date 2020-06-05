import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'shared/components/Loader';
import { getUserDetails as getUserDetailsAction } from 'store/actions';
import { getUserDetails, getUserDetailsStatus } from 'store/selectors';
import { Status } from 'util/status';
import * as Styled from './styled';
import * as Tiles from './Tiles';
import UserDetails from './UserDetails';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const userDetailsStatus = useSelector(getUserDetailsStatus);
  const userDetails = useSelector(getUserDetails);

  const statusResolved = [userDetailsStatus].every(s => s === Status.Resolved);

  useEffect(() => {
    function getUserDetails() {
      if (userDetailsStatus !== Status.Resolved) {
        dispatch(getUserDetailsAction());
      }
    }
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return statusResolved ? (
    <Styled.Dashboard>
      <Styled.DashboardHeader>
        <UserDetails status={userDetailsStatus} details={userDetails} />
      </Styled.DashboardHeader>
      <Tiles.Users />
      <Tiles.Permissions />
      <Tiles.Roles />
    </Styled.Dashboard>
  ) : (
    <Loader />
  );
};
