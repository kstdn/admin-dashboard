import { getResources } from 'api';
import { GENERIC_ERROR } from 'messages';
import { all, fork, put, takeLeading } from 'redux-saga/effects';
import * as fromResources from 'store/slices/Resources';
const {
  actions: { load, loadSuccess, loadFailure },
} = fromResources.slice;

function* watchLoad() {
  yield takeLeading(load.type, loadWorker);
}

function* loadWorker() {
  try {
    const resources = yield getResources();
    yield put(loadSuccess(resources));
  } catch {
    yield put(loadFailure(GENERIC_ERROR));
  }
}

export function* resourcesSaga() {
  yield all([fork(watchLoad)]);
}
