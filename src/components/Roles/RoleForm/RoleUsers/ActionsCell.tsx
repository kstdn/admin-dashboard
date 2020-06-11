import { unassignRole } from 'api';
import { RoleDto } from 'api/modules/authorization/dto/role.dto';
import { UserDto } from 'api/modules/users/dto/user.dto';
import React from 'react';
import { UserMinus } from 'react-feather';
import ConfirmStrip from 'shared/components/ConfirmStrip';
import { IconButton } from 'shared/components/IconButton';
import { CellProps } from 'shared/components/Table/defs/CellProps';

type Props = {
  roleId: RoleDto['id'];
  onUnassignRequest?: Function;
  onUnassignSuccess?: Function;
  onUnassignError?: Function;
} & CellProps<UserDto>;

const ActionsCell = ({
  roleId,
  row,
  onUnassignRequest,
  onUnassignSuccess,
  onUnassignError,
}: Props) => {
  const handleUnassign = async () => {
    try {
      onUnassignRequest && onUnassignRequest();
      await unassignRole(roleId, row.id);
      onUnassignSuccess && onUnassignSuccess();
    } catch {
      onUnassignError && onUnassignError();
    }
  };

  return (
    <ConfirmStrip
      trigger={
        <IconButton icon={<UserMinus />} color={'danger'} size={'small'} />
      }
      onConfirm={handleUnassign}
      confirmButtonProps={{ size: 'small' }}
      rejectButtonProps={{ size: 'small' }}
    />
  );
};

export default ActionsCell;
