import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { UserDto } from 'api/modules/users/dto/user.dto';
import { RootState } from 'store';
import { Status } from 'util/status';

type State = {
  cache: { [key: string]: UserDto[] };
  status: Status;
  error: string | undefined;
};

const adapter = createEntityAdapter<UserDto>();

export const slice = createSlice({
  name: 'users',
  initialState: adapter.getInitialState<State>({
    cache: {},
    status: Status.Idle,
    error: undefined,
  }),
  reducers: {
    load(state, action: PayloadAction<{
      page: number;
      limit: number;
      filter: string;
    }>,) {
      state.status = Status.Loading;
      adapter.setAll(state, []);
    },
    loadSuccess(state, action: PayloadAction<{
      filter: string;
      items: UserDto[];
    }>) {
      state.status = Status.Resolved;
      state.cache[action.payload.filter] = action.payload.items;
      adapter.setAll(state, action.payload.items);
    },
    loadFailure(state, action: PayloadAction<string>) {
      state.status = Status.Rejected;
      state.error = action.payload;
    },
  },
});

// Selectors
const selectState = (state: RootState) => state.users;
const entitySelectors = adapter.getSelectors<RootState>(state => state.users);

const selectCache = createSelector(selectState, state => state.cache);
const selectStatus = createSelector(selectState, state => state.status);
const selectError = createSelector(selectState, state => state.error);

export const selectors = {
  ...entitySelectors,
  selectCache,
  selectStatus,
  selectError,
};
