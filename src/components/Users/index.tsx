import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'shared/components/Loader';
import Table, { ColumnDef } from 'shared/components/Table';
import * as fromUsers from 'store/slices/Users';
import { Status } from 'util/status';
import { UserDto } from 'api/modules/users/dto/user.dto';

const columns: ColumnDef<UserDto>[] = [
  {
    prop: 'username',
    name: 'User',
  },
  {
    prop: 'email',
    name: 'Email',
  },
  {
    prop: 'firstName',
    name: 'First Name',
  },
  {
    prop: 'lastName',
    name: 'Last Name',
  },
];

const Users = () => {
  const dispatch = useDispatch();
  const usersStatus = useSelector(fromUsers.selectors.selectStatus);
  const users = useSelector(fromUsers.selectors.selectAll);

  useEffect(() => {
    dispatch(fromUsers.slice.actions.load());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (usersStatus === Status.Idle) return null;
  if (usersStatus === Status.Loading) return <Loader />;

  return (
    <Table data={users} columns={columns} keyProp={'id'}></Table>
  );
};

export default Users;
