import { grantPermissionToRole, grantPermissionToUser } from 'api';
import { ResourceActionsDto } from 'api/modules/authorization/dto/resource-permission.dto';
import { ResourceDto } from 'api/modules/authorization/dto/resource.dto';
import { push } from 'connected-react-router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ActionButton from 'shared/components/ActionButton';
import Card from 'shared/components/Card';
import { Divider } from 'shared/components/Divider';
import { Flex } from 'shared/components/Flex';
import { Stack } from 'shared/components/Stack';
import { Route } from 'shared/UrlRoute';
import { Status } from 'util/status';
import { createEmptyActionsSet, mergeChanges } from '../util';
import SelectResource from './SelectResource';
import SelectRole from './SelectRole';
import SelectUser from './SelectUser';
import * as Styled from './styled';

type AssigneeType = 'User' | 'Role';
const assigneeOptions: AssigneeType[] = ['User', 'Role'];

const CreatePermission = () => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState(Status.Idle);
  const [resource, setResource] = useState<ResourceDto>();
  const [assigneeType, setAssigneeType] = useState<AssigneeType>('User');
  const [userId, setUserId] = useState<string>();
  const [roleId, setRoleId] = useState<string>();
  const [actions, setActions] = useState(createEmptyActionsSet());

  const assigneeTypeIsUser = assigneeType === 'User';
  const assigneeTypeIsRole = assigneeType === 'Role';

  const handleAssigneeTypeChange = (assigneeType: AssigneeType) => {
    setAssigneeType(assigneeType);
  };

  const handleResourceChange = (resource: ResourceDto) => {
    setResource(resource);
  };

  const handleUserChange = (userId: string) => {
    setUserId(userId);
  };

  const handleRoleChange = (roleId: string) => {
    setRoleId(roleId);
  };

  const handleActionValueChange = (
    actionsChange: Partial<ResourceActionsDto>,
  ) => {
    setActions(mergeChanges(actions, actionsChange));
  };

  const handleCreate = async () => {
    setStatus(Status.Loading);
    try {
      if (assigneeTypeIsUser && userId && resource) {
        await grantPermissionToUser(userId, resource.id, actions);
      } else if (assigneeTypeIsRole && roleId && resource) {
        await grantPermissionToRole(roleId, resource.id, actions);
      }

      dispatch(push(Route.Dashboard.Permissions));
    } catch {}
  };

  return (
    <>
      <Card
        content={
          <Stack gap={true} gapSize={3} alignItems='flex-start'>
            <Stack gap={true}>
              <Styled.Label>Resource</Styled.Label>
              <SelectResource
                value={resource && resource.id}
                onChange={handleResourceChange}
              />
            </Stack>
            <Stack gap={true}>
              <Styled.Label>Assignee type</Styled.Label>
              <select
                name='type'
                onChange={e =>
                  handleAssigneeTypeChange(e.target.value as AssigneeType)
                }
              >
                {assigneeOptions.map(ao => (
                  <option value={ao} key={ao}>
                    {ao}
                  </option>
                ))}
              </select>
            </Stack>
            <Stack gap={true}>
              <Styled.Label>Assignee</Styled.Label>
              {assigneeTypeIsUser && (
                <SelectUser value={userId} onChange={handleUserChange} />
              )}
              {assigneeTypeIsRole && (
                <SelectRole value={roleId} onChange={handleRoleChange} />
              )}
            </Stack>
            <Styled.CrudTable
              actions={actions}
              onChange={actionsChange => handleActionValueChange(actionsChange)}
            />
          </Stack>
        }
        footer={
          <Flex gap={true}>
            <Divider />
            <ActionButton
              onClick={handleCreate}
              isLoading={status === Status.Loading}
            >
              Save
            </ActionButton>
          </Flex>
        }
      />
    </>
  );
};

export default CreatePermission;
