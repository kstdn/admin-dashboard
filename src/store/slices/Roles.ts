import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Status } from 'util/status';
import { RoleDto } from 'api/modules/authorization/dto/role.dto';

type State = {
  status: Status;
  error: string | undefined;
};

const adapter = createEntityAdapter<RoleDto>();

export const slice = createSlice({
  name: 'roles',
  initialState: adapter.getInitialState<State>({
    status: Status.Idle,
    error: undefined,
  }),
  reducers: {
    loadRoles(state) {
      state.status = Status.Loading;
    },
    loadRolesSuccess(state, action: PayloadAction<RoleDto[]>) {
      state.status = Status.Resolved;
      adapter.setAll(state, action.payload);
    },
    loadRolesFailure(state, action: PayloadAction<string>) {
      state.status = Status.Rejected;
      state.error = action.payload;
    },
  },
});

// Selectors
const selectRolesState = (state: RootState) => state.roles;
const entitySelectors = adapter.getSelectors<RootState>(state => state.roles);
const selectStatus = createSelector(selectRolesState, state => state.status);
const selectError = createSelector(selectRolesState, state => state.error);

export const selectors = {
  ...entitySelectors,
  selectStatus,
  selectError,
};
