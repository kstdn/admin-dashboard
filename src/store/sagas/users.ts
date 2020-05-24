import { getUsers } from 'api';
import { GENERIC_ERROR } from 'messages';
import { all, fork, put, select } from 'redux-saga/effects';
import * as fromUsers from 'store/slices/Users';
import { takeAndValidateCache } from './common';
import { invalidateCacheAfter } from 'constant-values';
const {
  actions: { load, loadSuccess, loadFailure },
} = fromUsers.slice;

function* watchLoad() {
  yield takeAndValidateCache(load.type, invalidateCacheAfter, loadWorker);
}

function* loadWorker(cacheIsInvalid: boolean) {
  try {
    const users = cacheIsInvalid
      ? yield getUsers()
      : yield select(fromUsers.selectors.selectAll);
    yield put(loadSuccess(users));
  } catch {
    yield put(loadFailure(GENERIC_ERROR));
  }
}

export function* usersSaga() {
  yield all([fork(watchLoad)]);
}
