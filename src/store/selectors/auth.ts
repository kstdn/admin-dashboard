import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

const getAuthState = (state: RootState) => state.auth;

export const getUser = createSelector(getAuthState, state => state.user);
export const getStatus = createSelector(getAuthState, state => state.status);
export const getIsAuthenticated = createSelector(
  getAuthState,
  state => !!state.user,
);
