import axios from 'axios';
import { ApiRoute } from './api-route';
import { UserDto } from './dto/user.dto';
import { removeAccessToken, removeRefreshToken } from './util';

export const login = async (username: string, password: string) => {
  return await axios.post(ApiRoute.Login, {
    username,
    password,
  });
};

export const logout = () => {
  removeAccessToken();
  removeRefreshToken();
};

export const refreshAccessToken = async () => {
  return axios.post(ApiRoute.RefreshToken);
};

export const getUserDetails = () => {
  return axios.get<UserDto, UserDto>(ApiRoute.Me);
};
