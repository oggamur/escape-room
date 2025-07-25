import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { BookingProcessState } from '../../types/state';
import { fetchBookingDataAction, postBookingAction } from '../api-actions';
import { PayloadAction } from '@reduxjs/toolkit';
import { BookedQuest } from '../../types/state';

const initialState: BookingProcessState = {
  bookedQuest: null,
  activeBookingData: null,
  isLoading: false,
  hasError: false,
  dataToSend: {
    date: null,
    time: null,
    contactPerson: null,
    phone: null,
    withChildren: false,
    peopleCount: null,
    placeId: null,
  },
};

export const bookingProcess = createSlice({
  name: NameSpace.BookingProcess,
  initialState,
  reducers: {
    setActiveBookingData: (state, action: PayloadAction<BookedQuest>) => {
      state.activeBookingData = action.payload;
    },
    setDate: (state, action: { payload: { date: string; time: string } }) => {
      state.dataToSend.date = action.payload.date;
      state.dataToSend.time = action.payload.time;
    },
    setContactPerson: (state, action: { payload: string }) => {
      state.dataToSend.contactPerson = action.payload;
    },
    setPhone: (state, action: { payload: string | null }) => {
      state.dataToSend.phone = action.payload;
    },
    setWithChildren: (state, action: { payload: boolean }) => {
      state.dataToSend.withChildren = action.payload;
    },
    setPeopleCount: (state, action: { payload: number }) => {
      state.dataToSend.peopleCount = action.payload;
    },
    setPlaceId: (state, action: { payload: string }) => {
      state.dataToSend.placeId = action.payload;
    },
    clearDataToSend: (state) => {
      state.dataToSend = {
        date: null,
        time: null,
        contactPerson: null,
        phone: null,
        withChildren: false,
        peopleCount: null,
        placeId: null,
      };
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
          state.dataToSend.placeId = action.payload.activeBookingData?.id;
          state.isLoading = false;
        }
      )
      .addCase(fetchBookingDataAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(postBookingAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postBookingAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(postBookingAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const {
  setActiveBookingData,
  setDate,
  setContactPerson,
  setPhone,
  setWithChildren,
  setPeopleCount,
  setPlaceId,
  clearDataToSend,
} = bookingProcess.actions;
