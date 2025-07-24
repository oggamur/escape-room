import { createAsyncThunk } from '@reduxjs/toolkit';
import { State } from '../types/state.js';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { QuestCardType } from '../types/types.js';
import { DetailedQuestCardType } from '../types/types.js';

export const fetchQuestsAction = createAsyncThunk<
  QuestCardType[],
  undefined,
  {
    state: State;
    extra: AxiosInstance;
  }
>('fetchOffers', async (_arg, { extra: api }) => {
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
>('fetchOfferData', async (id, { extra: api }) => {
  if (!id) {
    return { detailedOffer: null };
  }
  const { data: detailedOffer } = await api.get<DetailedQuestCardType>(
    `${APIRoute.Quest}/${id}`
  );
  return { detailedOffer };
});
