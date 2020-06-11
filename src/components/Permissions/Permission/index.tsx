import { deletePermission, updatePermission } from 'api';
import {
  ResourceActionsDto,
  ResourcePermissionDto,
} from 'api/modules/authorization/dto/resource-permission.dto';
import CrudTable from 'components/Permissions/CrudTable';
import { DELETE_ERROR, UPDATE_ERROR } from 'messages';
import React, { useEffect, useState } from 'react';
import ActionButton from 'shared/components/ActionButton';
import { Button } from 'shared/components/Button';
import Card from 'shared/components/Card';
import ConfirmStrip from 'shared/components/ConfirmStrip';
import { Divider } from 'shared/components/Divider';
import { Tile } from 'shared/components/Tile';
import { Status } from 'util/status';
import {
  checkIfHasChanges,
  extractActionsFromPermission,
  mergeChanges,
} from '../util';
import * as Styled from './styled';

type Props = {
  permission: ResourcePermissionDto;
  onUpdate: (id: string, changed: ResourceActionsDto) => void;
  onDelete: (id: string) => void;
};

type State = {
  updateStatus: Status;
  deleteStatus: Status;
  error: string | undefined;
};

const getInitialState = () => ({
  error: undefined,
  updateStatus: Status.Idle,
  deleteStatus: Status.Idle,
});

const Permission = ({ permission, onUpdate, onDelete }: Props) => {
  const [state, setState] = useState<State>(getInitialState());

  const { error, updateStatus, deleteStatus } = state;

  const toUser = permission.userId;
  const toRole = !toUser;

  const [localActions, setLocalActions] = useState<ResourceActionsDto>(
    extractActionsFromPermission(permission),
  );

  const hasChanges = checkIfHasChanges(
    extractActionsFromPermission(permission),
    localActions,
  );

  useEffect(() => {
    setState(getInitialState());
  }, [permission]);

  const handlePermissionValueChange = (
    actionsChange: Partial<ResourceActionsDto>,
  ) => {
    setLocalActions(mergeChanges(localActions, actionsChange));
  };

  const handleUpdate = async () => {
    setState({
      ...state,
      updateStatus: Status.Loading,
    });
    try {
      const changedActions = await updatePermission(
        permission.id,
        localActions,
      );
      onUpdate(permission.id, changedActions);
    } catch {
      setState({
        ...state,
        updateStatus: Status.Rejected,
        error: UPDATE_ERROR,
      });
    }
  };

  const handleDelete = async () => {
    setState({
      ...state,
      deleteStatus: Status.Loading,
    });
    try {
      await deletePermission(permission.id);
      onDelete(permission.id);
    } catch {
      setState({
        ...state,
        deleteStatus: Status.Rejected,
        error: DELETE_ERROR,
      });
    }
  };

  const reset = () => handlePermissionValueChange({ ...permission });

  return (
    <Styled.Wrapper>
      <Card
        header={
          <Styled.Header>
            <div>
              Permission for resource{' '}
              <Styled.ResourceName>
                {permission.resourceName}
              </Styled.ResourceName>
            </div>
            <Styled.Subheader>
              Assigned to {toUser && 'user'} {toRole && 'role'}{' '}
              <Styled.Assignee>
                {toUser && permission.userUsername}{' '}
                {toRole && permission.roleName}
              </Styled.Assignee>
            </Styled.Subheader>
          </Styled.Header>
        }
        content={
          <>
            <Styled.Container>
              <CrudTable
                actions={localActions}
                onChange={permissionChange =>
                  handlePermissionValueChange(permissionChange)
                }
              ></CrudTable>
              {error && <Tile color='danger'>{error}</Tile>}
            </Styled.Container>
          </>
        }
        footer={
          <>
            <ConfirmStrip
              trigger={
                <ActionButton
                  color='danger'
                  isLoading={deleteStatus === Status.Loading}
                >
                  Delete
                </ActionButton>
              }
              afterTrigger={
                <>
                  <Divider />
                  {hasChanges && (
                    <Button color='accent' onClick={reset}>
                      Reset
                    </Button>
                  )}
                  <ActionButton
                    color='success'
                    disabled={!hasChanges}
                    onClick={handleUpdate}
                    isLoading={updateStatus === Status.Loading}
                  >
                    Save changes
                  </ActionButton>
                </>
              }
              onConfirm={handleDelete}
            />
          </>
        }
      />
    </Styled.Wrapper>
  );
};

export default Permission;
