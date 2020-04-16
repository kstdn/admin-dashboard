import { RootState } from '..';
import { createSelector } from '@reduxjs/toolkit';

const getAuthState = (state: RootState) => state.auth;

export const getUser = createSelector(getAuthState, state => state.user);
export const getIsAuthenticated = createSelector(getAuthState, state => !!state.user);
