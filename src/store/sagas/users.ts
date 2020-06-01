import { getUsers } from 'api';
import { Paginated } from 'api/modules/shared/dto/Paginated';
import { UserDto } from 'api/modules/users/dto/user.dto';
import { entityAutocompleteDebounce } from 'constant-values';
import { GENERIC_ERROR } from 'messages';
import { all, debounce, fork, put, select } from 'redux-saga/effects';
import * as fromUsers from 'store/slices/Users';

const {
  actions: { load, loadSuccess, loadFailure },
} = fromUsers.slice;

function* watchLoad() {
  yield debounce(entityAutocompleteDebounce, load.type, loadWorker);
}

function* loadWorker(action: ReturnType<typeof load>) {
  if (!action.payload.filter.trim()) return;

  try {
    const cache = yield select(fromUsers.selectors.selectCache);
    const cached = cache[action.payload.filter];
    const { items }: Paginated<UserDto> = cached
      ? { items: cached }
      : yield getUsers(
          action.payload.page,
          action.payload.limit,
          action.payload.filter,
        );
    yield put(loadSuccess({ items, filter: action.payload.filter }));
  } catch {
    yield put(loadFailure(GENERIC_ERROR));
  }
}

export function* usersSaga() {
  yield all([fork(watchLoad)]);
}
