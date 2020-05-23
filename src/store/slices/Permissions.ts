import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  ResourcePermissionDto,
} from 'api/modules/authorization/dto/resource-permission.dto';
import { Paginated, PaginationData } from 'api/modules/shared/dto/Paginated';
import { RootState } from 'store';
import { Status } from 'util/status';

type State = {
  status: Status;
  error: string | undefined;
  paginationData: PaginationData | undefined;
};

const adapter = createEntityAdapter<ResourcePermissionDto>();

export const slice = createSlice({
  name: 'permissions',
  initialState: adapter.getInitialState<State>({
    status: Status.Idle,
    error: undefined,
    paginationData: undefined,
  }),
  reducers: {
    load: state => {
      state.status = Status.Loading;
      state.paginationData = undefined;
      state.error = undefined;
    },
    loadSuccess: (
      state,
      action: PayloadAction<Paginated<ResourcePermissionDto>>,
    ) => {
      state.status = Status.Resolved;
      const { items, ...paginationData } = action.payload;
      state.paginationData = paginationData;
      adapter.setAll(state, items);
    },
    loadFailure: (state, action: PayloadAction<string>) => {
      state.status = Status.Rejected;
      state.error = action.payload;
    },
  },
});

// Selectors
const selectState = (state: RootState) => state.permissions;
const entitySelectors = adapter.getSelectors<RootState>(
  state => state.permissions,
);
const selectStatus = createSelector(
  selectState,
  state => state.status,
);
const selectError = createSelector(
  selectState,
  state => state.error,
);

export const selectors = {
  ...entitySelectors,
  selectStatus,
  selectError,
};
