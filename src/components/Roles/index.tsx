import { deleteRole, getRoles } from 'api';
import { RoleDto } from 'api/modules/authorization/dto/role.dto';
import { entityInitialLimit, entityInitialPage } from 'constant-values';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import ActionsCell from './ActionsCell';

const columns: (
  onEditClick: Function,
  onDeleteClick: Function,
  deleteStatus: Status,
  deleteInProgressId: string | undefined,
) => ColumnDef<RoleDto>[] = (
  onEditClick,
  onDeleteClick,
  deleteStatus,
  deleteInProgressId,
) => [
  {
    prop: 'name',
    name: 'Name',
  },
  {
    prop: 'id',
    name: ' ',
    component: {
      type: ActionsCell,
      ownProps: {
        onEditClick,
        onDeleteClick,
        getDeleteStatus: (role: RoleDto) =>
          role.id === deleteInProgressId ? deleteStatus : Status.Idle,
      },
    },
    align: 'end',
  },
];

const content = (roles: RoleDto[], columns: ColumnDef<RoleDto>[]) => {
  return <Table data={roles} columns={columns} keyProp={'id'} />;
};

const Roles = () => {
  const history = useHistory();

  const [page, setPage] = useState(entityInitialPage);
  const [limit, setLimit] = useState(entityInitialLimit);

  const [deleteInProgressId, setDeleteInProgressId] = useState<string>();

  const [deleteStatus, setDeleteStatus] = useState(Status.Idle);

  const [state, setState] = useEntityState<RoleDto>();
  const { items: roles, paginationData, status, error } = state;

  const { refresh } = useLoadEntityPaginated(getRoles, setState, page, limit);

  const handleCreateNewClick = () => {
    history.push(Route.Dashboard.RolesNew);
  };

  const onEditClick = (row: RoleDto) => {
    history.push(Route.Dashboard.RolesEdit, row);
  };

  const handleDelete = async (role: RoleDto) => {
    try {
      setDeleteStatus(Status.Loading);
      setDeleteInProgressId(role.id);
      await deleteRole(role.id);
      setDeleteStatus(Status.Resolved);
      setDeleteInProgressId(undefined);
      onDeleteSuccess && onDeleteSuccess();
    } catch {
      setDeleteStatus(Status.Rejected);
      setDeleteInProgressId(undefined);
    }
  };

  const onDeleteSuccess = () => {
    refresh();
  };

  if (status === Status.Idle) return null;

  return (
    <SandwichContainer
      header={
        <Flex gap={true} shouldWrap={true}>
          <Button onClick={handleCreateNewClick}>Create New</Button>
          <Divider />
          <LimitSelector value={limit} onChange={setLimit}></LimitSelector>
        </Flex>
      }
      content={
        status === Status.Loading ? (
          <Loader />
        ) : (
          content(
            roles,
            columns(
              onEditClick,
              handleDelete,
              deleteStatus,
              deleteInProgressId,
            ),
          )
        )
      }
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

export default Roles;
