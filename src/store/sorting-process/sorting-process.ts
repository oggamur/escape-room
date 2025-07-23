import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortGenreType, SortLevelType } from '../../const';
import { SortingProcessState } from '../../types/state';

const initialState: SortingProcessState = {
  sortLevelType: SortLevelType.ANY,
  sortGenreType: SortGenreType.ALL,
};

export const sortingProcess = createSlice({
  name: NameSpace.SortingProcess,
  initialState,
  reducers: {
    setSortLevelType(state, action: PayloadAction<string>) {
      state.sortLevelType = action.payload;
    },
    setSortGenreType(state, action: PayloadAction<string>) {
      state.sortGenreType = action.payload;
    },
  },
});

export const { setSortLevelType, setSortGenreType } = sortingProcess.actions;
