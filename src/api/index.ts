import axios from 'axios';
import { ApiRoute } from './api-route';
import { removeAccessToken } from './util';

export const login = async (username: string, password: string) => {
  return await axios.post(ApiRoute.Login, {
    username,
    password,
  });
};

export const logout = () => {
  removeAccessToken();
};

export const refreshAccessToken = async () => {
  return axios.post(ApiRoute.RefreshToken);
};

export const getUserDetails = () => {
  return axios.get(ApiRoute.Me);
};
