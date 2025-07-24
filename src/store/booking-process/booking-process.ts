import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { BookingProcessState } from '../../types/state';
import { fetchBookingDataAction } from '../api-actions';
import { PayloadAction } from '@reduxjs/toolkit';
import { BookedQuest } from '../../types/state';

const initialState: BookingProcessState = {
  bookedQuest: null,
  activeBookingData: null,
  isLoading: false,
  hasError: false,
};

export const bookingProcess = createSlice({
  name: NameSpace.BookingProcess,
  initialState,
  reducers: {
    setActiveBookingData: (state, action: PayloadAction<BookedQuest>) => {
      state.activeBookingData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingDataAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchBookingDataAction.fulfilled,
        (
          state,
          action: {
            payload: {
              bookedQuestData: BookedQuest[] | null;
              activeBookingData: BookedQuest | null;
            };
          }
        ) => {
          state.bookedQuest = action.payload.bookedQuestData;
          state.activeBookingData = action.payload.activeBookingData;
          state.isLoading = false;
        }
      )
      .addCase(fetchBookingDataAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { setActiveBookingData } = bookingProcess.actions;
