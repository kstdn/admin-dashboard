import { getResources } from 'api';
import { invalidateCacheAfter } from 'constant-values';
import { GENERIC_ERROR } from 'messages';
import { all, fork, put, select } from 'redux-saga/effects';
import * as fromResources from 'store/slices/Resources';
import { takeAndValidateCache } from './common';
const {
  actions: { load, loadSuccess, loadFailure },
} = fromResources.slice;

function* watchLoad() {
  yield takeAndValidateCache(load.type, invalidateCacheAfter, loadWorker);
}

function* loadWorker(cacheIsInvalid: boolean) {
  try {
    const resources = cacheIsInvalid
      ? yield getResources()
      : yield select(fromResources.selectors.selectAll);
    yield put(loadSuccess(resources));
  } catch {
    yield put(loadFailure(GENERIC_ERROR));
  }
}

export function* resourcesSaga() {
  yield all([fork(watchLoad)]);
}
