import { getResources } from 'api';
import { ResourceDto } from 'api/modules/authorization/dto/resource.dto';
import { Paginated } from 'api/modules/shared/dto/Paginated';
import { GENERIC_ERROR } from 'messages';
import { all, debounce, fork, put, select } from 'redux-saga/effects';
import * as fromResources from 'store/slices/Resources';
import { entityAutocompleteDebounce } from 'constant-values';

const {
  actions: { load, loadSuccess, loadFailure },
} = fromResources.slice;

function* watchLoad() {
  yield debounce(entityAutocompleteDebounce, load.type, loadWorker);
}

function* loadWorker(action: ReturnType<typeof load>) {
  if (!action.payload.filter.trim()) return;

  try {
    const cache = yield select(fromResources.selectors.selectCache);
    const cached = cache[action.payload.filter];
    const { items }: Paginated<ResourceDto> = cached
      ? { items: cached }
      : yield getResources(
          action.payload.page,
          action.payload.limit,
          action.payload.filter,
        );
    yield put(loadSuccess({ items, filter: action.payload.filter }));
  } catch {
    yield put(loadFailure(GENERIC_ERROR));
  }
}

export function* resourcesSaga() {
  yield all([fork(watchLoad)]);
}
