import { all, fork, takeLeading, put } from 'redux-saga/effects';
import * as fromUsers from 'store/slices/Users';
import { getUsers } from 'api';
import { GENERIC_ERROR } from 'messages';
const { actions: { loadUsers, loadUsersSuccess, loadUsersFailure } } = fromUsers.slice;

function* watchLoadUsers() {
  yield takeLeading(loadUsers.type, loadUsersWorker);
}

function* loadUsersWorker() {
  try {
    const users = yield getUsers();
    yield put(loadUsersSuccess(users));
  } catch {
    yield put(loadUsersFailure(GENERIC_ERROR));
  }
}

export function* usersSaga() {
  yield all([
    fork(watchLoadUsers),
  ]);
}