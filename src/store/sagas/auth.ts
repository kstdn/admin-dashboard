import { login } from 'api';
import { getCurrentUser } from 'api/util';
import { push } from 'connected-react-router';
import { all, fork, put, takeLeading } from 'redux-saga/effects';
import { Route } from 'shared/route.enum';
import {
  login as loginAction,
  loginFailure,
  loginSuccess,
  logout as logoutAction,
  logoutSuccess,
} from '../actions';

export function* watchLogin() {
  yield takeLeading(loginAction.type, loginWorker);
}

function* loginWorker({
  payload: { username, password },
}: ReturnType<typeof loginAction>) {
  try {
    yield login(username, password);
    yield put(loginSuccess(getCurrentUser()));
    yield put(push(Route.Root));
  } catch (error) {
    yield put(loginFailure());
  }
}

export function* watchLogout() {
  yield takeLeading(logoutAction.type, logoutWorker);
}

function* logoutWorker() {
  yield put(logoutSuccess());
  yield put(push(Route.Root));
}

export function* authSaga() {
  yield all([fork(watchLogin), fork(watchLogout)]);
}
