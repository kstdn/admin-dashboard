import { getRoles } from 'api';
import { GENERIC_ERROR } from 'messages';
import { all, fork, put, takeLeading } from 'redux-saga/effects';
import * as fromRoles from 'store/slices/Roles';
const { actions: { loadRoles, loadRolesSuccess, loadRolesFailure } } = fromRoles.slice;

function* watchLoadRoles() {
  yield takeLeading(loadRoles.type, loadRolesWorker);
}

function* loadRolesWorker() {
  try {
    const roles = yield getRoles();
    yield put(loadRolesSuccess(roles));
  } catch {
    yield put(loadRolesFailure(GENERIC_ERROR));
  }
}

export function* rolesSaga() {
  yield all([
    fork(watchLoadRoles),
  ]);
}