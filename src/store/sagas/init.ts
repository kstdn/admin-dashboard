import { refreshAccessToken } from 'api';
import { accessTokenExists, getCurrentUser } from 'api/util';
import { put, take } from 'redux-saga/effects';
import {
  appInit,
  loginSuccess,
  refreshSessionFailure,
  refreshSessionSuccess,
} from '../actions';

export function* watchAppInit() {
  yield take(appInit);
  yield setIsAuthenticatedState();
}

export function* setIsAuthenticatedState() {
  if (accessTokenExists()) {
    yield setCurrentUser();
  } else {
    try {
      yield refreshAccessToken();
      yield setCurrentUser(true);
    } catch {
      yield put(refreshSessionFailure());
    }
  }
}

export function* setCurrentUser(viaRefresh: boolean = false) {
  const username = getCurrentUser();
  if (viaRefresh) {
    yield put(refreshSessionSuccess(username));
  } else {
    yield put(loginSuccess(username));
  }
}
