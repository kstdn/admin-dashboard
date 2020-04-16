import { all, fork } from 'redux-saga/effects';
import { watchInitLocationChange } from './router';
import { watchLogin } from './auth';

export default function* rootSaga() {
  yield all([
    fork(watchInitLocationChange),
    fork(watchLogin),
  ]);
}