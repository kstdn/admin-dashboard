import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as fromUsers from 'store/slices/Users';

const Users = () => {
  const dispatch = useDispatch();
  const usersStatus = useSelector(fromUsers.selectors.selectStatus);
  const users = useSelector(fromUsers.selectors.selectAll);

  useEffect(() => {
    dispatch(fromUsers.slice.actions.loadUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {users.map(u => (
        <div key={u.id}>
          {u.id} {u.username}
        </div>
      ))}
    </>
  );
};

export default Users;
