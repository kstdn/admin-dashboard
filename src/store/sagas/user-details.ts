import { all, fork, takeLatest, put } from 'redux-saga/effects';
import { getUserDetails as getUserDetailsAction, getUserDetailsSuccess, getUserDetailsFailure} from 'store/actions';
import { getOwnUser } from 'api';
import { UserDto } from 'api/modules/users/dto/user.dto';

export function* watchGetUserDetails() {
  yield takeLatest(getUserDetailsAction.type, getUserDetailsWorker);
}

function* getUserDetailsWorker() {
  try{
    const details: UserDto = yield getOwnUser();
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