import { createReducer } from '@reduxjs/toolkit';
import { Status } from 'util/status';
import {
  appInit,
  login,
  loginFailure,
  loginSuccess,
  logout,
  refreshSessionFailure,
  refreshSessionSuccess,
} from '../actions';

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
      .addCase(appInit, (state, action) => {
        state.status = Status.Loading;
      })
      .addCase(refreshSessionSuccess, (state, action) => {
        state.status = Status.Resolved;
        state.user = action.payload;
      })
      .addCase(refreshSessionFailure, (state, action) => {
        state.status = Status.Rejected;
        state.user = undefined;
      })
      .addCase(login, (state, action) => {
        state.status = Status.Loading;
      })
      .addCase(loginSuccess, (state, action) => {
        state.status = Status.Resolved;
        state.user = action.payload;
      })
      .addCase(loginFailure, (state, action) => {
        state.status = Status.Rejected;
        state.user = undefined;
      })
      .addCase(logout, state => {
        state.status = Status.Idle;
        state.user = undefined;
      }),
);
