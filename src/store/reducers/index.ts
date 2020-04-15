import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import history from 'util/history';

export const rootReducer = combineReducers({
  router: connectRouter(history),
});
