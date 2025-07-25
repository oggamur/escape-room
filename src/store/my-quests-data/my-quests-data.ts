import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { MyQuestsData } from '../../types/state';
import { MyQuestType } from '../../types/types';
import {
  deleteBookingAction,
  fetchBookedQuestsDataAction,
} from '../api-actions';
const initialState: MyQuestsData = {
  bookedQuestsData: [],
  isLoading: false,
  hasError: false,
};
export const myQuestsData = createSlice({
  name: NameSpace.MyQuestsData,
  initialState,
  reducers: {
    deleteBooking: (state, action: PayloadAction<{ id: string }>) => {
      state.bookedQuestsData = state.bookedQuestsData.filter(
        (quest) => quest.id !== action.payload.id
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchBookedQuestsDataAction.fulfilled,
      (state, action: PayloadAction<MyQuestType[] | []>) => {
        state.bookedQuestsData = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(fetchBookedQuestsDataAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookedQuestsDataAction.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
    builder.addCase(deleteBookingAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteBookingAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBookingAction.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export const { deleteBooking } = myQuestsData.actions;
