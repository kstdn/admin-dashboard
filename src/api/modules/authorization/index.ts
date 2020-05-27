import { httpClient } from 'util/http-client';
import { Paginated } from '../shared/dto/Paginated';
import { ApiRoute } from './../../api-route';
import { ResourcePermissionDto, ResourceActionsDto } from './dto/resource-permission.dto';
import { ResourceDto } from './dto/resource.dto';
import { RoleDto } from './dto/role.dto';

export const getPermissions = (page: number, limit: number) => {
  return httpClient.get<
    Paginated<ResourcePermissionDto>,
    Paginated<ResourcePermissionDto>
  >(ApiRoute.Permissions, {
    params: {
      page,
      limit
    }
  });
};

export const getPermission = (id: string) => {
  return httpClient.get<ResourcePermissionDto, ResourcePermissionDto>(
    `${ApiRoute.Permissions}/${id}`,
  );
};

export const grantPermissionToUser = (
  userId: string,
  resourceId: string,
  actions: ResourceActionsDto,
) => {
  return httpClient.post<ResourcePermissionDto, ResourcePermissionDto>(
    ApiRoute.PermissionsUser,
    actions,
    {
      params: {
        userId,
        resourceId,
      },
    },
  );
};

export const grantPermissionToRole = (
  roleId: string,
  resourceId: string,
  actions: ResourceActionsDto,
) => {
  return httpClient.post<ResourcePermissionDto, ResourcePermissionDto>(
    ApiRoute.PermissionsUser,
    actions,
    {
      params: {
        roleId,
        resourceId,
      },
    },
  );
};

export const updatePermission = (
  id: string,
  actions: ResourceActionsDto,
) => {
  return httpClient.patch<ResourceActionsDto, ResourceActionsDto>(
    `${ApiRoute.Permissions}/${id}`,
    actions,
  );
};

export const deletePermission = (id: string) => {
  return httpClient.delete<void, void>(`${ApiRoute.Permissions}/${id}`);
};

export const getRoles = () => {
  return httpClient.get<RoleDto[], RoleDto[]>(ApiRoute.Roles);
};

export const getRole = (id: string) => {
  return httpClient.get<RoleDto, RoleDto>(`${ApiRoute.Roles}/${id}`);
};

export const createRole = (name: string) => {
  return httpClient.post<RoleDto, RoleDto>(`${ApiRoute.Roles}`, {
    params: {
      name,
    },
  });
};

export const assignRole = (roleId: string, userId: string) => {
  return httpClient.post<RoleDto, RoleDto>(`${ApiRoute.Roles}/${roleId}/user/${userId}`);
};

export const unassignRole = (roleId: string, userId: string) => {
  return httpClient.delete<RoleDto, RoleDto>(`${ApiRoute.Roles}/${roleId}/user/${userId}`);
};

export const updateRole = (id: string, name: string) => {
  return httpClient.patch<RoleDto, RoleDto>(`${ApiRoute.Roles}/${id}`, {
    params: {
      name,
    },
  });
};

export const deleteRole = (id: string) => {
  return httpClient.delete<void, void>(`${ApiRoute.Roles}/${id}`);
};

export const getResources = () => {
  return httpClient.get<ResourceDto[], ResourceDto[]>(ApiRoute.Resources);
};
