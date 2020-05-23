import { getUsers } from 'api';
import { GENERIC_ERROR } from 'messages';
import { all, fork, put, takeLeading } from 'redux-saga/effects';
import * as fromUsers from 'store/slices/Users';
const {
  actions: { load, loadSuccess, loadFailure },
} = fromUsers.slice;

function* watchLoad() {
  yield takeLeading(load.type, loadWorker);
}

function* loadWorker() {
  try {
    const users = yield getUsers();
    yield put(loadSuccess(users));
  } catch {
    yield put(loadFailure(GENERIC_ERROR));
  }
}

export function* usersSaga() {
  yield all([fork(watchLoad)]);
}
