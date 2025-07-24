import { createAsyncThunk } from '@reduxjs/toolkit';
import { State } from '../types/state.ts';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { QuestCardType } from '../types/types.ts';
import { DetailedQuestCardType } from '../types/types.ts';
import { BookedQuest } from '../types/state.ts';

export const fetchQuestsAction = createAsyncThunk<
  QuestCardType[],
  undefined,
  {
    state: State;
    extra: AxiosInstance;
  }
>('fetchQuests', async (_arg, { extra: api }) => {
  const { data } = await api.get<QuestCardType[]>(APIRoute.QuestsList);
  return data;
});

export const fetchDetailedQuestDataAction = createAsyncThunk<
  {
    detailedOffer: DetailedQuestCardType | null;
  },
  string | undefined,
  {
    state: State;
    extra: AxiosInstance;
  }
>('fetchQuestData', async (id, { extra: api }) => {
  if (!id) {
    return { detailedOffer: null };
  }
  const { data: detailedOffer } = await api.get<DetailedQuestCardType>(
    `${APIRoute.Quest}/${id}`
  );
  return { detailedOffer };
});

export const fetchBookingDataAction = createAsyncThunk<
  {
    bookedQuestData: BookedQuest[] | null;
    activeBookingData: BookedQuest | null;
  },
  string | undefined,
  {
    state: State;
    extra: AxiosInstance;
  }
>('fetchBookingData', async (id, { extra: api }) => {
  if (!id) {
    return { bookedQuestData: null, activeBookingData: null };
  }
  const { data: bookedQuestData } = await api.get<BookedQuest[]>(
    `${APIRoute.Quest}/${id}${APIRoute.Booking}`
  );

  let activeBookingData = null;
  if (bookedQuestData) {
    activeBookingData = bookedQuestData[0];
  }
  return { bookedQuestData, activeBookingData };
});
