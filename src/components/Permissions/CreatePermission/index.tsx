import { ResourceActionsDto } from 'api/modules/authorization/dto/resource-permission.dto';
import { ResourceDto } from 'api/modules/authorization/dto/resource.dto';
import React, { useState } from 'react';
import { Button } from 'shared/components/Button';
import Card from 'shared/components/Card';
import { Divider } from 'shared/components/Divider';
import { Flex } from 'shared/components/Flex/styled';
import { Status } from 'util/status';
import CrudTable from '../CrudTable';
import { createEmptyActionsSet, mergeChanges } from '../util';
import SelectResource from './SelectResource';
import SelectRole from './SelectRole';
import SelectUser from './SelectUser';
import { grantPermissionToUser, grantPermissionToRole } from 'api';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Route } from 'shared/UrlRoute';

type AssigneeType = 'user' | 'role';
const assigneeOptions: AssigneeType[] = ['user', 'role'];

const CreatePermission = () => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState(Status.Idle);
  const [resource, setResource] = useState<ResourceDto>();
  const [assigneeType, setAssigneeType] = useState<AssigneeType>('user');
  const [userId, setUserId] = useState<string>();
  const [roleId, setRoleId] = useState<string>();
  const [actions, setActions] = useState(createEmptyActionsSet());

  const assigneeTypeIsUser = assigneeType === 'user';
  const assigneeTypeIsRole = assigneeType === 'role';

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
          <div>
            <SelectResource
              value={resource && resource.id}
              onChange={handleResourceChange}
            />
            <div>
              <select
                name='role'
                id=''
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
            </div>
            Select
            {assigneeTypeIsUser && (
              <SelectUser value={userId} onChange={handleUserChange} />
            )}
            {assigneeTypeIsRole && (
              <SelectRole value={roleId} onChange={handleRoleChange} />
            )}
            <CrudTable
              actions={actions}
              onChange={actionsChange => handleActionValueChange(actionsChange)}
            />
          </div>
        }
        footer={
          <Flex gap={true}>
            <Divider />
            <Button onClick={handleCreate}>Save</Button>
          </Flex>
        }
      />
    </>
  );
};

export default CreatePermission;
