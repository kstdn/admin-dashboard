import { RoleDto } from 'api/modules/authorization/dto/role.dto';
import React, { FC } from 'react';
import { Edit, Loader, Trash2 } from 'react-feather';
import ConfirmStrip from 'shared/components/ConfirmStrip';
import { IconButton } from 'shared/components/IconButton';
import { CellProps } from 'shared/components/Table/defs/CellProps';
import { Status } from 'util/status';

type OwnProps = {
  getDeleteStatus: (role: RoleDto) => Status;
  onDeleteClick: (row: RoleDto) => any;
  onEditClick: (row: RoleDto) => any;
};

const ActionsCell: FC<OwnProps & CellProps<RoleDto>> = ({
  row,
  getDeleteStatus,
  onDeleteClick,
  onEditClick,
}) => {
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
          onClick={() => onEditClick(row)}
          icon={<Edit />}
          color='accent'
        />
      }
      onConfirm={() => onDeleteClick(row)}
    />
  );
};

export default ActionsCell;
