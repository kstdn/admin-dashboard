import { getUsers } from 'api';
import { UserDto } from 'api/modules/users/dto/user.dto';
import { entityInitialLimit, entityInitialPage } from 'constant-values';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import SandwichContainer from 'shared/components/Container/SandwichContainer';
import { Divider } from 'shared/components/Divider';
import { Flex } from 'shared/components/Flex';
import LimitSelector from 'shared/components/LimitSelector';
import Loader from 'shared/components/Loader';
import Paginator from 'shared/components/Paginator';
import Table, { ColumnDef } from 'shared/components/Table';
import { useEntityState } from 'shared/hooks/useEntityState';
import { useLoadEntityPaginated } from 'shared/hooks/useLoadEntityPaginated';
import { Route } from 'shared/UrlRoute';
import { Status } from 'util/status';

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
  const [page, setPage] = useState(entityInitialPage);
  const [limit, setLimit] = useState(entityInitialLimit);

  const [state, setState] = useEntityState<UserDto>();
  const { items: users, paginationData, status, error } = state;

  useLoadEntityPaginated(getUsers, setState, page, limit);

  if (status === Status.Idle) return null;
  if (status === Status.Loading) return <Loader />;

  return (
    <SandwichContainer
      header={
        <Flex gap={true} shouldWrap={true}>
          <Link to={Route.Dashboard.PermissionsNew}>
            <Button>Create new</Button>
          </Link>
          <Divider />
          <LimitSelector value={limit} onChange={setLimit}></LimitSelector>
        </Flex>
      }
      content={<Table data={users} columns={columns} keyProp={'id'}></Table>}
      footer={
        paginationData && (
          <Paginator
            currentPage={paginationData.currentPage}
            totalPages={paginationData.totalPages}
            maxDisplayedPages={5}
            onGoToPage={page => setPage(page)}
          />
        )
      }
    />
  );
};

export default Users;
