import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  ResourceActionsDto,
  ResourcePermissionDto,
} from 'api/modules/authorization/dto/resource-permission.dto';
import { Paginated, PaginationData } from 'api/modules/shared/dto/Paginated';
import { RootState } from 'store';
import { Status } from 'util/status';

type PermissionEntityStatus = {
  status: Status;
  error: string | undefined;
};

type PermissionsState = {
  status: Status;
  error: string | undefined;
  paginationData: PaginationData | undefined;
  entityStatuses: { [key: string]: PermissionEntityStatus };
};

const adapter = createEntityAdapter<ResourcePermissionDto>();

export const slice = createSlice({
  name: 'permissions',
  initialState: adapter.getInitialState<PermissionsState>({
    status: Status.Idle,
    error: undefined,
    paginationData: undefined,
    entityStatuses: {},
  }),
  reducers: {
    loadPermissions: state => {
      state.status = Status.Loading;
      state.paginationData = undefined;
      state.error = undefined;
      state.entityStatuses = {};
    },
    loadPermissionsSuccess: (
      state,
      action: PayloadAction<Paginated<ResourcePermissionDto>>,
    ) => {
      state.status = Status.Resolved;
      const { items, ...paginationData } = action.payload;
      state.paginationData = paginationData;
      adapter.setAll(state, items);
    },
    loadPermissionsFailure: (state, action: PayloadAction<string>) => {
      state.status = Status.Rejected;
      state.error = action.payload;
    },
    unloadPermissions: state => {
      state.status = Status.Idle;
      state.paginationData = undefined;
      state.entityStatuses = {};
      adapter.removeAll(state);
    },
    createPermission: (
      state,
      action: PayloadAction<{
        userId?: string;
        roleId?: string;
        resourceId: string;
        actions: ResourceActionsDto;
      }>,
    ) => {},
    createPermissionSuccess: (
      state,
      action: PayloadAction<ResourcePermissionDto>,
    ) => {
      adapter.addOne(state, action.payload);
    },
    createPermissionFailure: (state, action) => {},
    updatePermission: (
      state,
      action: PayloadAction<{ id: string; changes: ResourceActionsDto }>,
    ) => {
      state.entityStatuses[action.payload.id] = {
        status: Status.Loading,
        error: undefined,
      };
    },
    updatePermissionSuccess: (
      state,
      action: PayloadAction<{ id: string; changes: ResourceActionsDto }>,
    ) => {
      state.entityStatuses[action.payload.id] = {
        status: Status.Resolved,
        error: undefined,
      };
      adapter.updateOne(state, action.payload);
    },
    updatePermissionFailure: (state, action) => {
      state.entityStatuses[action.payload.id] = {
        status: Status.Rejected,
        error: action.payload,
      };
    },
    deletePermission: (state, action: PayloadAction<string>) => {
      state.entityStatuses[action.payload] = {
        status: Status.Loading,
        error: undefined,
      };
    },
    deletePermissionSuccess: (state, action: PayloadAction<string>) => {
      delete state.entityStatuses[action.payload];
      adapter.removeOne(state, action.payload);
    },
    deletePermissionFailure: (state, action) => {
      state.entityStatuses[action.payload.id] = {
        status: Status.Rejected,
        error: action.payload,
      };
    },
  },
});

// Selectors
const selectPermissionsState = (state: RootState) => state.permissions;
const entitySelectors = adapter.getSelectors<RootState>(
  state => state.permissions,
);
const selectStatus = createSelector(
  selectPermissionsState,
  state => state.status,
);
const selectError = createSelector(
  selectPermissionsState,
  state => state.error,
);

const selectPermissionStatus = (id: string) =>
  createSelector(
    selectPermissionsState,
    state => state.entityStatuses[id]?.status,
  );

const selectPermissionError = (id: string) =>
  createSelector(
    selectPermissionsState,
    state => state.entityStatuses[id]?.error,
  );

export const selectors = {
  ...entitySelectors,
  selectStatus,
  selectError,
  selectPermissionStatus,
  selectPermissionError,
};
