import { httpClient } from 'util/http-client';
import { Paginated } from '../shared/dto/Paginated';
import { ApiRoute } from './../../api-route';
import { UserDto } from './dto/user.dto';
import { RoleDto } from '../authorization/dto/role.dto';

export const getOwnUser = () => {
  return httpClient.get<UserDto, UserDto>(ApiRoute.UsersMe);
};

export const getUsers = (page: number, limit: number, filter?: string) => {
  return httpClient.get<Paginated<UserDto>, Paginated<UserDto>>(
    ApiRoute.Users,
    {
      params: {
        page,
        limit,
        filter: filter && `username,like,${filter}`
      },
    },
  );
};

export const getUsersForRole = (page: number, limit: number, roleId?: RoleDto['id']) => {
  return httpClient.get<Paginated<UserDto>, Paginated<UserDto>>(
    `${ApiRoute.Users}/roles/${roleId}`,
    {
      params: {
        page,
        limit,
      },
    },
  );
};
