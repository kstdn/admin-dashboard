import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ResourceDto } from 'api/modules/authorization/dto/resource.dto';
import { RootState } from 'store';
import { Status } from 'util/status';

type State = {
  status: Status;
  error: string | undefined;
};

const adapter = createEntityAdapter<ResourceDto>();

export const slice = createSlice({
  name: 'resources',
  initialState: adapter.getInitialState<State>({
    status: Status.Idle,
    error: undefined,
  }),
  reducers: {
    load(state) {
      state.status = Status.Loading;
    },
    loadSuccess(state, action: PayloadAction<ResourceDto[]>) {
      state.status = Status.Resolved;
      adapter.setAll(state, action.payload);
    },
    loadFailure(state, action: PayloadAction<string>) {
      state.status = Status.Rejected;
      state.error = action.payload;
    },
  },
});

// Selectors
const selectState = (state: RootState) => state.resources;
const entitySelectors = adapter.getSelectors<RootState>(
  state => state.resources,
);
const selectStatus = createSelector(selectState, state => state.status);
const selectError = createSelector(selectState, state => state.error);

export const selectors = {
  ...entitySelectors,
  selectStatus,
  selectError,
};
