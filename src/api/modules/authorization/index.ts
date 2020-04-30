import axios from 'axios';
import { ApiRoute } from './../../api-route';
import { GrantPermissionDto } from './dto/grant-permission.dto';
import { ResourcePermissionDto } from './dto/resource-permission.dto';
import { Resource } from './dto/resource.dto';
import { Role } from './dto/role.dto';

export const getPermissions = () => {
  return axios.get<ResourcePermissionDto[], ResourcePermissionDto[]>(
    ApiRoute.Permissions,
  );
};

export const getPermission = (id: string) => {
  return axios.get<ResourcePermissionDto, ResourcePermissionDto>(
    `${ApiRoute.Permissions}/${id}`,
  );
};

export const grantPermissionToUser = (
  userId: string,
  resourceId: string,
  operations: GrantPermissionDto,
) => {
  return axios.post<ResourcePermissionDto, ResourcePermissionDto>(
    ApiRoute.PermissionsUser,
    operations,
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
  operations: GrantPermissionDto,
) => {
  return axios.post<ResourcePermissionDto, ResourcePermissionDto>(
    ApiRoute.PermissionsUser,
    operations,
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
  operations: GrantPermissionDto,
) => {
  return axios.patch<ResourcePermissionDto, ResourcePermissionDto>(
    `${ApiRoute.Permissions}/${id}`,
    operations,
  );
};

export const deletePermission = (id: string) => {
  return axios.delete<void, void>(`${ApiRoute.Permissions}/${id}`);
};

export const getRoles = () => {
  return axios.get<Role[], Role[]>(ApiRoute.Roles);
};

export const getRole = (id: string) => {
  return axios.get<Role, Role>(`${ApiRoute.Roles}/${id}`);
};

export const createRole = (name: string) => {
  return axios.post<Role, Role>(`${ApiRoute.Roles}`, {
    params: {
      name,
    },
  });
};

export const assignRole = (roleId: string, userId: string) => {
  return axios.post<Role, Role>(`${ApiRoute.Roles}/${roleId}/user/${userId}`);
};

export const unassignRole = (roleId: string, userId: string) => {
  return axios.delete<Role, Role>(`${ApiRoute.Roles}/${roleId}/user/${userId}`);
};

export const updateRole = (id: string, name: string) => {
  return axios.patch<Role, Role>(`${ApiRoute.Roles}/${id}`, {
    params: {
      name,
    },
  });
};

export const deleteRole = (id: string) => {
  return axios.delete<void, void>(`${ApiRoute.Roles}/${id}`);
};

export const getResources = () => {
  return axios.get<Resource[], Resource[]>(ApiRoute.Resources);
};
