import { RoleDto } from 'api/modules/authorization/dto/role.dto';
import React, { FC } from 'react';
import { Edit, Loader, Trash2 } from 'react-feather';
import ConfirmStrip from 'shared/components/ConfirmStrip';
import { IconButton } from 'shared/components/IconButton';
import { CellProps } from 'shared/components/Table/defs/CellProps';
import { Status } from 'util/status';

type OwnProps = {
  getUpdateStatus: (role: RoleDto) => Status,
  getDeleteStatus: (role: RoleDto) => Status,
  onDeleteClick: (row: RoleDto) => void;
  onUpdateToggle: (row: RoleDto) => void;
};

const ActionsCell: FC<OwnProps & CellProps<RoleDto>> = ({
  row,
  value,
  getUpdateStatus,
  getDeleteStatus,
  onDeleteClick,
  onUpdateToggle,
}) => {
  const isUpdateLoading = getUpdateStatus(row) === Status.Loading;
  const isDeleteLoading = getDeleteStatus(row) === Status.Loading;
  
  return (
    <ConfirmStrip
      trigger={
        <IconButton
          icon={isDeleteLoading ? <Loader /> : <Trash2 />}
          disabled={isDeleteLoading}
          color='danger'
        />
      }
      beforeTrigger={
        <IconButton
          onClick={() => onUpdateToggle(row)}
          icon={isUpdateLoading ? <Loader /> : <Edit />}
          disabled={isUpdateLoading}
          color='accent'
        />
      }
      onConfirm={() => onDeleteClick(row)}
    />
  );
};

export default ActionsCell;
