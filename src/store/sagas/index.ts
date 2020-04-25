import { all, fork } from 'redux-saga/effects';
import { authSaga } from './auth';
import { watchAppInit } from './init';
import { watchInitLocationChange } from './router';

export default function* rootSaga() {
  yield all([
    fork(watchAppInit),
    fork(watchInitLocationChange),
    fork(authSaga),
  ]);
}
