import { createReducer } from '@reduxjs/toolkit';
import { Status } from 'util/status';
import { login, loginFailure, loginSuccess } from '../actions';

export type AuthState = {
  user: string | undefined;
  status: Status;
};

export const authReducer = createReducer<AuthState>(
  {
    user: undefined,
    status: Status.Idle,
  },
  builder =>
    builder
      .addCase(login, (state, action) => {
        state.status = Status.Loading;
      })
      .addCase(loginSuccess, (state, action) => {
        state.status = Status.Resolved;
        state.user = action.payload;
      })
      .addCase(loginFailure, (state, action) => {
        state.status = Status.Rejected;
      }),
);
