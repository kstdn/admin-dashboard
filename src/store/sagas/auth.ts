import { push } from 'connected-react-router';
import { delay, put, takeLeading } from 'redux-saga/effects';
import { Route } from '../../shared/route.enum';
import { login, loginSuccess } from '../actions';

export function* watchLogin() {
  yield takeLeading(login.type, loginWorker);
}

export function* loginWorker() {
  yield delay(2000);
  yield put(loginSuccess('Kosta'));
  yield put(push(Route.Root));
}
