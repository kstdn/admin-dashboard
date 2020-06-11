import { getUsersForRole } from 'api';
import { RoleDto } from 'api/modules/authorization/dto/role.dto';
import { UserDto } from 'api/modules/users/dto/user.dto';
import { entityInitialLimit, entityInitialPage } from 'constant-values';
import { EMPTY_LIST } from 'messages';
import React, { useState } from 'react';
import SandwichContainer from 'shared/components/Container/SandwichContainer';
import { Label } from 'shared/components/Label';
import Loader from 'shared/components/Loader';
import Paginator from 'shared/components/Paginator';
import Table, { ColumnDef } from 'shared/components/Table';
import { useEntityState } from 'shared/hooks/useEntityState';
import { useLoadEntityPaginated } from 'shared/hooks/useLoadEntityPaginated';
import styled from 'styled-components/macro';
import { box } from 'styles/mixins/box/box.mixin';
import { Status } from 'util/status';
import ActionsCell from './ActionsCell';
import AssignUserToRole from './AssignUserToRole';

const Container = styled.div`
  ${box(true)}
  background: var(--background-color-elevation-3);
  height: 200px;
`;

const Empty = styled.div`
  ${box(true)}
  display: flex;
  justify-content: center;
  align-items: center;
`;

const columns: (
  roleId: RoleDto['id'],
  onUnassignRequest?: Function,
  onUnassignSuccess?: Function,
  onUnassignError?: Function,
) => ColumnDef<UserDto>[] = (
  roleId,
  onUnassignRequest,
  onUnassignSuccess,
  onUnassignError,
) => [
  {
    prop: 'email',
    name: 'Email',
  },
  {
    prop: 'id',
    align: 'end',
    component: {
      type: ActionsCell,
      ownProps: {
        roleId,
        onUnassignRequest,
        onUnassignSuccess,
        onUnassignError,
      },
    },
    renderCellPadding: false,
  },
];

type Props = {
  roleId: RoleDto['id'];
};

const RoleUsers = ({ roleId }: Props) => {
  const [page, setPage] = useState(entityInitialPage);
  const [limit, setLimit] = useState(entityInitialLimit);

  const [usersState, setUsersState] = useEntityState<UserDto>();
  const [unassignStatus, setUnassignStatus] = useState(Status.Idle);
  const { items, paginationData, status, error } = usersState;

  const loading =
    usersState.status === Status.Loading || unassignStatus === Status.Loading;
  const empty = usersState.status === Status.ResolvedEmpty;

  const { refresh } = useLoadEntityPaginated(
    getUsersForRole,
    setUsersState,
    page,
    limit,
    roleId,
  );

  const handleUnassignRequest = () => {
    setUnassignStatus(Status.Loading);
  };

  const handleUnassignSuccess = () => {
    setUnassignStatus(Status.Resolved);
    refresh();
  };

  const handleUnassignError = () => {
    setUnassignStatus(Status.Rejected);
  };

  return (
    <>
      <AssignUserToRole roleId={roleId} onSuccess={refresh} />
      <Label>Users</Label>
      <Container>
        {loading ? (
          <Loader />
        ) : empty ? (
          <Empty>{EMPTY_LIST}</Empty>
        ) : (
          <SandwichContainer
            content={
              <Table
                data={items}
                columns={columns(
                  roleId,
                  handleUnassignRequest,
                  handleUnassignSuccess,
                  handleUnassignError,
                )}
                keyProp={'id'}
                options={{ renderHeader: false, rowHeight: 32 }}
              />
            }
            footer={
              paginationData && (
                <Paginator
                  currentPage={paginationData.currentPage}
                  totalPages={paginationData.totalPages}
                  onGoToPage={page => setPage(page)}
                />
              )
            }
          />
        )}
      </Container>
    </>
  );
};

export default RoleUsers;
