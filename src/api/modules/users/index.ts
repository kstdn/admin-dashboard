import axios from 'axios';
import { ApiRoute } from './../../api-route';
import { UserDto } from './dto/user.dto';

export const getOwnUser = () => {
  return axios.get<UserDto, UserDto>(ApiRoute.UsersMe);
};

export const getUsers = () => {
  return axios.get<UserDto[], UserDto[]>(ApiRoute.Users);
};
