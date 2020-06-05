import { deleteRole, getRoles, updateRole } from 'api';
import { RoleDto } from 'api/modules/authorization/dto/role.dto';
import { entityInitialLimit, entityInitialPage } from 'constant-values';
import React, { useState } from 'react';
import { Divider } from 'shared/components/Divider';
import { Flex } from 'shared/components/Flex';
import LimitSelector from 'shared/components/LimitSelector';
import Loader from 'shared/components/Loader';
import Paginator from 'shared/components/Paginator';
import Table, { ColumnDef, EditDef } from 'shared/components/Table';
import { useEntityState } from 'shared/hooks/useEntityState';
import { useLoadEntityPaginated } from 'shared/hooks/useLoadEntityPaginated';
import { Status } from 'util/status';
import ActionsCell from './ActionsCell';
import CreateRole from './CreateRole';
import * as Styled from './styled';

const columns: (
  onUpdateToggle: Function,
  onDeleteClick: Function,
  updateStatus: Status,
  deleteStatus: Status,
  updateInProgressId: string | undefined,
  deleteInProgressId: string | undefined,
) => ColumnDef<RoleDto>[] = (
  onUpdateToggle,
  onDeleteClick,
  updateStatus,
  deleteStatus,
  updateInProgressId,
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
        onUpdateToggle,
        onDeleteClick,
        getUpdateStatus: (role: RoleDto) =>
          role.id === updateInProgressId ? updateStatus : Status.Idle,
        getDeleteStatus: (role: RoleDto) =>
          role.id === deleteInProgressId ? deleteStatus : Status.Idle,
      },
    },
    align: 'end',
  },
];

const content = (
  roles: RoleDto[],
  columns: ColumnDef<RoleDto>[],
  edit: EditDef<RoleDto> | undefined,
) => {
  return <Table data={roles} columns={columns} edit={edit} keyProp={'id'} />;
};

const Roles = () => {
  const [page, setPage] = useState(entityInitialPage);
  const [limit, setLimit] = useState(entityInitialLimit);

  const [currentEdit, setCurrentEdit] = useState<EditDef<RoleDto>>();

  const [updateInProgressId, setUpdateInProgressId] = useState<string>();
  const [deleteInProgressId, setDeleteInProgressId] = useState<string>();

  const [updateStatus, setUpdateStatus] = useState(Status.Idle);
  const [deleteStatus, setDeleteStatus] = useState(Status.Idle);

  const [state, setState] = useEntityState<RoleDto>();
  const { items: roles, paginationData, status, error } = state;

  const { refresh } = useLoadEntityPaginated(getRoles, setState, page, limit);

  const onUpdateToggle = (row: RoleDto) => {
    if (currentEdit && currentEdit.matches(row)) {
      setCurrentEdit(undefined);
    } else {
      setCurrentEdit({
        matches: (r: RoleDto) => r.id === row.id,
        prop: 'name',
        onSubmit: value => handleUpdate(row.id, value),
      });
    }
  };

  const handleUpdate = async (id: string, name: string) => {
    try {
      setUpdateStatus(Status.Loading);
      setUpdateInProgressId(id);
      await updateRole(id, name);
      setUpdateStatus(Status.Resolved);
      setCurrentEdit(undefined);
      setUpdateInProgressId(undefined);
      onUpdateSuccess && onUpdateSuccess();
    } catch {
      setUpdateStatus(Status.Rejected);
      setUpdateInProgressId(undefined);
    }
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

  const onCreateSuccess = () => {
    refresh();
  };

  const onUpdateSuccess = () => {
    refresh();
  };

  const onDeleteSuccess = () => {
    refresh();
  };

  if (status === Status.Idle) return null;

  return (
    <Styled.SandwichContainer
      header={
        <Flex gap={true} shouldWrap={true}>
          <CreateRole onSuccess={onCreateSuccess} />
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
              onUpdateToggle,
              handleDelete,
              updateStatus,
              deleteStatus,
              updateInProgressId,
              deleteInProgressId,
            ),
            currentEdit,
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
