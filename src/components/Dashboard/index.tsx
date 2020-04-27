import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails as getUserDetailsAction } from 'store/actions';
import { getUserDetails, getUserDetailsStatus } from 'store/selectors';
import { Status } from 'util/status';
import UserDetails from './UserDetails';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const userDetailsStatus = useSelector(getUserDetailsStatus);
  const userDetails = useSelector(getUserDetails);

  useEffect(() => {
    dispatch(getUserDetailsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {userDetailsStatus === Status.Resolved && (
        <UserDetails details={userDetails} />
      )}
    </div>
  );
};
