import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchQuestsAction } from '../api-actions';
import { QuestCardType } from '../../types/types';
import { QuestsState } from '../../types/state';

const initialState: QuestsState = {
  quests: [],
  isLoading: false,
  hasError: false,
};

export const questsData = createSlice({
  name: NameSpace.QuestsData,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchQuestsAction.fulfilled,
        (state, action: PayloadAction<QuestCardType[]>) => {
          state.quests = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchQuestsAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});
