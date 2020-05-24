import { getRoles } from 'api';
import { invalidateCacheAfter } from 'constant-values';
import { GENERIC_ERROR } from 'messages';
import { all, fork, put, select } from 'redux-saga/effects';
import * as fromRoles from 'store/slices/Roles';
import { takeAndValidateCache } from './common';
const {
  actions: { load, loadSuccess, loadFailure },
} = fromRoles.slice;

function* watchLoad() {
  yield takeAndValidateCache(load.type, invalidateCacheAfter, loadWorker);
}

function* loadWorker(cacheIsInvalid: boolean) {
  try {
    const roles = cacheIsInvalid
      ? yield getRoles()
      : yield select(fromRoles.selectors.selectAll);
    yield put(loadSuccess(roles));
  } catch {
    yield put(loadFailure(GENERIC_ERROR));
  }
}

export function* rolesSaga() {
  yield all([fork(watchLoad)]);
}
