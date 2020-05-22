import {
  ResourceActionsDto,
  ResourcePermissionDto,
} from 'api/modules/authorization/dto/resource-permission.dto';

export const actions: (keyof ResourceActionsDto)[] = [
  'createOwn',
  'readOwn',
  'updateOwn',
  'deleteOwn',
  'createAny',
  'readAny',
  'updateAny',
  'deleteAny',
];

export const createEmptyActionsSet = (): ResourceActionsDto => {
  return actions.reduce<ResourceActionsDto>(
    (prev, curr) => ({ ...prev, [curr]: false }),
    {} as ResourceActionsDto,
  );
};

export const extractActionsFromPermission = (
  permission: ResourcePermissionDto,
): ResourceActionsDto => {
  return Object.fromEntries(
    Object.entries(permission).filter(([key]) =>
      actions.includes(key as keyof ResourceActionsDto),
    ),
  ) as ResourceActionsDto;
};

export const mergeChanges = (
  prevActions: ResourceActionsDto,
  actionsChange: Partial<ResourceActionsDto>,
) => {
  return { ...prevActions, ...actionsChange };
};

export const checkIfHasChanges = (
  baseActions: ResourceActionsDto,
  changedActions: ResourceActionsDto,
): boolean => {
  return actions.some(action => baseActions[action] !== changedActions[action]);
};
