import { createSlice } from '@reduxjs/toolkit';
import { AppRoute, NameSpace } from '../../const';
import { PageProcessState } from '../../types/state';

const initialState: PageProcessState = {
  activePage: AppRoute.MAIN,
};

export const pageProcess = createSlice({
  name: NameSpace.PageProcess,
  initialState,
  reducers: {
    setActivePage: (state, action: { payload: AppRoute }) => {
      state.activePage = action.payload;
    },
  },
});

export const { setActivePage } = pageProcess.actions;
