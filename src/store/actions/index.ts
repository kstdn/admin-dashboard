import { createAction } from '@reduxjs/toolkit';

export const appInit = createAction('APP_INIT');

export const refreshSessionSuccess = createAction<string>('REFRESH_SESSION_SUCCESS');
export const refreshSessionFailure = createAction('REFRESH_SESSION_FAILURE');

export const login = createAction<{ username: string; password: string }>(
  'LOGIN',
);
export const loginSuccess = createAction<string>('LOGIN_SUCCESS');
export const loginFailure = createAction('LOGIN_FAILURE');

export const logout = createAction('LOGOUT');
export const logoutSuccess = createAction('LOGOUT_SUCCESS');
