import { all, fork } from 'redux-saga/effects';
import { permissionsSaga } from 'store/sagas/permissions';
import { userDetailsSaga } from 'store/sagas/user-details';
import { usersSaga } from 'store/sagas/users';
import { authSaga } from './auth';
import { watchAppInit } from './init';
import { watchInitLocationChange } from './router';

export default function* rootSaga() {
  yield all([
    fork(watchAppInit),
    fork(watchInitLocationChange),
    fork(authSaga),
    fork(userDetailsSaga),
    fork(usersSaga),
    fork(permissionsSaga),
  ]);
}
