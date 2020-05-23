import { getPermissions } from 'api';
import { ResourcePermissionDto } from 'api/modules/authorization/dto/resource-permission.dto';
import { Paginated } from 'api/modules/shared/dto/Paginated';
import { GENERIC_ERROR } from 'messages';
import { all, fork, put, takeLeading } from 'redux-saga/effects';
import * as fromPermissions from 'store/slices/Permissions';

const {
  actions: { load, loadSuccess, loadFailure },
} = fromPermissions.slice;

function* watchLoad() {
  yield takeLeading(load.type, loadWorker);
}

function* loadWorker() {
  try {
    const permissions: Paginated<ResourcePermissionDto> = yield getPermissions();
    yield put(loadSuccess(permissions));
  } catch (e) {
    yield put(loadFailure(GENERIC_ERROR));
  }
}

export function* permissionsSaga() {
  yield all([fork(watchLoad)]);
}
