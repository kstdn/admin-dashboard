import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { UserDto } from 'api/modules/users/dto/user.dto';
import { RootState } from 'store';
import { Status } from 'util/status';

type UsersState = {
  status: Status;
  error: string | undefined;
};

const usersAdapter = createEntityAdapter<UserDto>();

export const slice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState<UsersState>({
    status: Status.Idle,
    error: undefined,
  }),
  reducers: {
    loadUsers(state) {
      state.status = Status.Loading;
    },
    loadUsersSuccess(state, action: PayloadAction<UserDto[]>) {
      state.status = Status.Resolved;
      usersAdapter.setAll(state, action.payload);
    },
    loadUsersFailure(state, action: PayloadAction<string>) {
      state.status = Status.Rejected;
      state.error = action.payload;
    },
  },
});

// Selectors
const selectUsersState = (state: RootState) => state.users;
const entitySelectors = usersAdapter.getSelectors<RootState>(state => state.users);
const selectStatus = createSelector(selectUsersState, state => state.status);
const selectError = createSelector(selectUsersState, state => state.error);

export const selectors = {
  ...entitySelectors,
  selectStatus,
  selectError,
};
