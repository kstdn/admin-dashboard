import { getRoles } from 'api';
import { GENERIC_ERROR } from 'messages';
import { all, fork, put, takeLeading } from 'redux-saga/effects';
import * as fromRoles from 'store/slices/Roles';
const { actions: { load, loadSuccess, loadFailure } } = fromRoles.slice;

function* watchLoadRoles() {
  yield takeLeading(load.type, loadRolesWorker);
}

function* loadRolesWorker() {
  try {
    const roles = yield getRoles();
    yield put(loadSuccess(roles));
  } catch {
    yield put(loadFailure(GENERIC_ERROR));
  }
}

export function* rolesSaga() {
  yield all([
    fork(watchLoadRoles),
  ]);
}