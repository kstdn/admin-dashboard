import { httpClient } from 'util/http-client';
import { Paginated } from '../shared/dto/Paginated';
import { ApiRoute } from './../../api-route';
import { UserDto } from './dto/user.dto';

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
