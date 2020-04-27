import { all, fork, takeLatest, put } from 'redux-saga/effects';
import { getUserDetails as getUserDetailsAction, getUserDetailsSuccess, getUserDetailsFailure} from 'store/actions';
import { getUserDetails } from 'api';
import { UserDto } from 'api/dto/user.dto';

export function* watchGetUserDetails() {
  yield takeLatest(getUserDetailsAction.type, getUserDetailsWorker);
}

function* getUserDetailsWorker() {
  try{
    const details: UserDto = yield getUserDetails();
    yield put(getUserDetailsSuccess(details));
  } catch {
    yield put(getUserDetailsFailure())
  }
}

export function* userDetailsSaga() {
  yield all([
    fork(watchGetUserDetails),
  ]);
}