import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import history from 'util/history';
import { authReducer } from './auth';
import { userDetailsReducer } from 'store/reducers/user-details';
import * as fromUsers from 'store/slices/Users';
import * as fromPermissions from 'store/slices/Permissions';

export const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  userDetails: userDetailsReducer,
  users: fromUsers.slice.reducer,
  permissions: fromPermissions.slice.reducer,
});
