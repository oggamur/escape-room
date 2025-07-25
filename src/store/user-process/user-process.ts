import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { UserData } from '../../types/types';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userData: {
    email: null,
    avatarUrl: '',
    isPro: false,
    name: '',
    token: '',
  },
  isLoading: false,
  hasError: false,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        checkAuthAction.fulfilled,
        (state, action: { payload: { token: string; data: UserData } }) => {
          if (!action.payload.token) {
            state.authorizationStatus = AuthorizationStatus.NO_AUTH;
            return;
          }
          state.userData = action.payload.data;
          state.authorizationStatus = AuthorizationStatus.AUTH;
        }
      )
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.AUTH;
        state.userData = action.payload;
        state.isLoading = false;
      })
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
        state.isLoading = false;
      })
      .addCase(logoutAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});
