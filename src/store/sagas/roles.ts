import { getRoles } from 'api';
import { RoleDto } from 'api/modules/authorization/dto/role.dto';
import { Paginated } from 'api/modules/shared/dto/Paginated';
import { entityAutocompleteDebounce } from 'constant-values';
import { GENERIC_ERROR } from 'messages';
import { all, debounce, fork, put, select } from 'redux-saga/effects';
import * as fromRoles from 'store/slices/Roles';

const {
  actions: { load, loadSuccess, loadFailure },
} = fromRoles.slice;

function* watchLoad() {
  yield debounce(entityAutocompleteDebounce, load.type, loadWorker);
}

function* loadWorker(action: ReturnType<typeof load>) {
  if (!action.payload.filter.trim()) return;

  try {
    const cache = yield select(fromRoles.selectors.selectCache);
    const cached = cache[action.payload.filter];
    const { items }: Paginated<RoleDto> = cached
      ? { items: cached }
      : yield getRoles(
          action.payload.page,
          action.payload.limit,
          action.payload.filter,
        );
    yield put(loadSuccess({ items, filter: action.payload.filter }));
  } catch {
    yield put(loadFailure(GENERIC_ERROR));
  }
}

export function* rolesSaga() {
  yield all([fork(watchLoad)]);
}
