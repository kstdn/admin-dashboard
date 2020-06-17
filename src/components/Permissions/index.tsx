import { deletePermission, getPermissions } from 'api';
import { ResourcePermissionDto } from 'api/modules/authorization/dto/resource-permission.dto';
import { entityInitialLimit, entityInitialPage } from 'constant-values';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
) => ColumnDef<ResourcePermissionDto>[] = (
  onEditClick,
  onDeleteClick,
  deleteStatus,
  deleteInProgressId,
) => [
  {
    prop: 'resourceName',
    name: 'Resource',
  },
  {
    prop: 'roleName',
    name: 'Role',
  },
  {
    prop: 'userUsername',
    name: 'User',
  },
  {
    prop: 'id',
    name: ' ',
    component: {
      type: ActionsCell,
      ownProps: {
        onEditClick,
        onDeleteClick,
        getDeleteStatus: (resourcePermission: ResourcePermissionDto) =>
          resourcePermission.id === deleteInProgressId
            ? deleteStatus
            : Status.Idle,
      },
    },
    align: 'end',
  },
];

const Permissions = () => {
  const history = useHistory();

  const [page, setPage] = useState(entityInitialPage);
  const [limit, setLimit] = useState(entityInitialLimit);

  const [deleteInProgressId, setDeleteInProgressId] = useState<string>();
  const [deleteStatus, setDeleteStatus] = useState(Status.Idle);

  const [state, setState] = useEntityState<ResourcePermissionDto>();
  const { items: permissions, paginationData, status, error } = state;

  const { refresh } = useLoadEntityPaginated(
    getPermissions,
    setState,
    page,
    limit,
  );

  const handleLimitChange = (value: number) => {
    setLimit(value);
    setPage(entityInitialPage);
  };

  const handleEdit = (row: ResourcePermissionDto) => {
    history.push(Route.Dashboard.PermissionsEdit, row);
  };

  const handleDelete = async (resourcePermission: ResourcePermissionDto) => {
    try {
      setDeleteStatus(Status.Loading);
      setDeleteInProgressId(resourcePermission.id);
      await deletePermission(resourcePermission.id);
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
  if (status === Status.Loading) return <Loader />;

  return (
    <SandwichContainer
      header={
        <Flex gap={true}>
          <Link to={Route.Dashboard.PermissionsNew}>
            <Button>Create new</Button>
          </Link>
          <Divider />
          <LimitSelector value={limit} onChange={handleLimitChange} />
        </Flex>
      }
      content={
        <Table
          data={permissions}
          columns={columns(
            handleEdit,
            handleDelete,
            deleteStatus,
            deleteInProgressId,
          )}
          keyProp={'id'}
        />
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

export default Permissions;
