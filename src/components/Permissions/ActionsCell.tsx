import { ResourcePermissionDto } from 'api/modules/authorization/dto/resource-permission.dto';
import React, { FC } from 'react';
import { Edit, Loader, Trash2 } from 'react-feather';
import ConfirmStrip from 'shared/components/ConfirmStrip';
import { IconButton } from 'shared/components/IconButton';
import { CellProps } from 'shared/components/Table/defs/CellProps';
import { Status } from 'util/status';

type OwnProps = {
  getDeleteStatus: (role: ResourcePermissionDto) => Status;
  onDeleteClick: (row: ResourcePermissionDto) => any;
  onEditClick: (row: ResourcePermissionDto) => any;
};

const ActionsCell: FC<OwnProps & CellProps<ResourcePermissionDto>> = ({
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
