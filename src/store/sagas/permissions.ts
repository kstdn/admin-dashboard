import {
  deletePermission,
  getPermissions,
  grantPermissionToRole,
  grantPermissionToUser,
  updatePermission,
} from 'api';
import {
  ResourceActionsDto,
  ResourcePermissionDto,
} from 'api/modules/authorization/dto/resource-permission.dto';
import { Paginated } from 'api/modules/shared/dto/Paginated';
import { GENERIC_ERROR } from 'messages';
import { all, fork, put, takeLeading } from 'redux-saga/effects';
import * as fromPermissions from 'store/slices/Permissions';

const {
  actions: {
    loadPermissions,
    loadPermissionsSuccess,
    loadPermissionsFailure,
    createPermission: createPermissionAction,
    createPermissionSuccess,
    createPermissionFailure,
    updatePermission: updatePermissionAction,
    updatePermissionSuccess,
    updatePermissionFailure,
    deletePermission: deletePermissionAction,
    deletePermissionSuccess,
    deletePermissionFailure,
  },
} = fromPermissions.slice;

function* watchLoadPermissions() {
  yield takeLeading(loadPermissions.type, loadPermissionsWorker);
}

function* loadPermissionsWorker() {
  try {
    const permissions: Paginated<ResourcePermissionDto> = yield getPermissions();
    yield put(loadPermissionsSuccess(permissions));
  } catch (e) {
    yield put(loadPermissionsFailure(GENERIC_ERROR));
  }
}

function* watchCreatePermission() {
  yield takeLeading(createPermissionAction.type, createPermissionWorker);
}

function* createPermissionWorker(
  action: ReturnType<typeof createPermissionAction>,
) {
  try {
    const { userId, roleId, resourceId, actions } = action.payload;
    let permission;
    if (userId) {
      permission = yield grantPermissionToUser(userId, resourceId, actions);
    } else if (roleId) {
      permission = yield grantPermissionToRole(roleId, resourceId, actions);
    } else {
      throw new Error();
    }
    yield put(createPermissionSuccess(permission));
  } catch (e) {
    yield put(createPermissionFailure(GENERIC_ERROR));
  }
}

function* watchUpdatePermission() {
  yield takeLeading(updatePermissionAction.type, updatePermissionWorker);
}

function* updatePermissionWorker(
  action: ReturnType<typeof updatePermissionAction>,
) {
  try {
    const { id, changes } = action.payload;
    const changed: ResourceActionsDto = yield updatePermission(id, changes);
    yield put(updatePermissionSuccess({ id, changes: changed }));
  } catch (e) {
    yield put(updatePermissionFailure(GENERIC_ERROR));
  }
}

function* watchDeletePermission() {
  yield takeLeading(deletePermissionAction.type, deletePermissionWorker);
}

function* deletePermissionWorker(
  action: ReturnType<typeof deletePermissionAction>,
) {
  try {
    yield deletePermission(action.payload);
    yield put(deletePermissionSuccess(action.payload));
  } catch (e) {
    yield put(deletePermissionFailure(GENERIC_ERROR));
  }
}

export function* permissionsSaga() {
  yield all([
    fork(watchLoadPermissions),
    fork(watchCreatePermission),
    fork(watchUpdatePermission),
    fork(watchDeletePermission),
  ]);
}
