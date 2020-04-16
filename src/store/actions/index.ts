import { createAction } from '@reduxjs/toolkit'

export const login = createAction('LOGIN');
export const loginSuccess = createAction<string>('LOGIN_SUCCESS');
export const loginFailure = createAction('LOGIN_FAILURE');
