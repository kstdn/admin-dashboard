import { createReducer } from '@reduxjs/toolkit';
import { UserDto } from 'api/dto/user.dto';
import {
  getUserDetails,
  getUserDetailsSuccess,
  getUserDetailsFailure,
} from 'store/actions';
import { Status } from 'util/status';

type UserDetailsState = {
  status: Status;
  details?: UserDto;
};

export const userDetailsReducer = createReducer<UserDetailsState>(
  {
    status: Status.Idle,
  },
  builder =>
    builder
      .addCase(getUserDetails, state => {
        state.status = Status.Loading;
      })
      .addCase(getUserDetailsSuccess, (state, action) => {
        state.status = Status.Resolved;
        state.details = action.payload;
      })
      .addCase(getUserDetailsFailure, state => {
        state.status = Status.Rejected;
        state.details = undefined;
      }),
);
