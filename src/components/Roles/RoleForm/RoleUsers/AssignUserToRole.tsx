import { assignRole } from 'api';
import { RoleDto } from 'api/modules/authorization/dto/role.dto';
import { UserDto } from 'api/modules/users/dto/user.dto';
import React, { useState } from 'react';
import ActionButton from 'shared/components/ActionButton';
import { Flex } from 'shared/components/Flex';
import { Label } from 'shared/components/Label';
import SelectUser from 'shared/components/SelectUser';
import { Status } from 'util/status';

type Props = {
  roleId: RoleDto['id'];
  onSuccess?: Function;
  onError?: Function;
};

const AssignUserToRole = ({ roleId, onSuccess, onError }: Props) => {
  const [selectedUser, setSelectedUser] = useState<UserDto>();

  const [status, setStatus] = useState(Status.Idle);

  const handleAssignClick = async () => {
    try {
      setStatus(Status.Loading);
      await assignRole(roleId, selectedUser!.id);
      setStatus(Status.Resolved);
      setSelectedUser(undefined);
      onSuccess && onSuccess();
    } catch {
      setStatus(Status.Rejected);
      onError && onError();
    }
  };

  return (
    <>
      <Label>Assign user</Label>
      <Flex gap={true}>
        <SelectUser onChange={setSelectedUser} />
        {selectedUser && (
          <ActionButton
            isLoading={status === Status.Loading}
            onClick={handleAssignClick}
          >
            Assign
          </ActionButton>
        )}
      </Flex>
    </>
  );
};

export default AssignUserToRole;
