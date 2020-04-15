import { all, fork } from 'redux-saga/effects';
import { watchInitLocationChange } from './router';

export default function* rootSaga() {
  yield all([
    fork(watchInitLocationChange),
  ]);
}