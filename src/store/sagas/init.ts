import { refreshAccessToken } from 'api';
import { accessTokenExists, getCurrentUser } from 'api/util';
import { push } from 'connected-react-router';
import { put, take } from 'redux-saga/effects';
import { Route } from 'shared/route.enum';
import {
  appInit,
  loginSuccess,
  refreshTokenFailure,
  refreshTokenSuccess,
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
      yield put(refreshTokenFailure());
    }
  }
}

export function* setCurrentUser(viaRefresh: boolean = false) {
  const username = getCurrentUser();
  if (viaRefresh) {
    yield put(refreshTokenSuccess(username));
  } else {
    yield put(loginSuccess(username));
  }
  yield put(push(Route.Root));
}
