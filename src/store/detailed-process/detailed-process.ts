import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DetailedProcessState } from '../../types/state';
import { fetchDetailedQuestDataAction } from '../api-actions';
const initialState: DetailedProcessState = {
  detailedQuest: null,
  isLoading: false,
  hasError: false,
};

export const detailedProcess = createSlice({
  name: NameSpace.DetailedProcess,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailedQuestDataAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDetailedQuestDataAction.fulfilled, (state, action) => {
        state.detailedQuest = action.payload.detailedOffer;
        state.isLoading = false;
      })
      .addCase(fetchDetailedQuestDataAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});
