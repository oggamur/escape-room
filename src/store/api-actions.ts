import { createAsyncThunk } from '@reduxjs/toolkit';
import { DataToSendType, State } from '../types/state.ts';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { QuestCardType, UserData, AuthData } from '../types/types.ts';
import { DetailedQuestCardType, MyQuestType } from '../types/types.ts';
import { BookedQuest } from '../types/state.ts';
import { getToken, saveToken, dropToken } from '../services/token.ts';
import { AppDispatch } from '../types/state.ts';
import { redirectToRoute } from './action.ts';
import { AppRoute } from '../const';
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

export const fetchBookedQuestsDataAction = createAsyncThunk<
  MyQuestType[] | [],
  undefined,
  {
    state: State;
    extra: AxiosInstance;
  }
>('fetchBookingData', async (_arg, { extra: api }) => {
  const { data: bookedQuestsData } = await api.get<MyQuestType[]>(
    `${APIRoute.Reservations}`
  );

  return bookedQuestsData;
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

  return { bookedQuestData, activeBookingData, id };
});

export const checkAuthAction = createAsyncThunk<
  { token: string; data: UserData },
  undefined,
  {
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const token = getToken();
  const { data } = await api.get<UserData>(APIRoute.Login);

  return { token, data };
});

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.MAIN));
    return data;
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(redirectToRoute(AppRoute.MAIN));
});

export const postBookingAction = createAsyncThunk<
  void,
  { data: DataToSendType; id: string },
  {
    state: State;
    extra: AxiosInstance;
  }
>(
  'comments/post',
  async (
    {
      data: {
        date,
        time,
        contactPerson,
        phone,
        withChildren,
        peopleCount,
        placeId,
      },
      id,
    },
    { extra: api }
  ) => {
    await api.post(`${APIRoute.Quest}/${id}${APIRoute.Booking}`, {
      date,
      time,
      contactPerson,
      phone,
      withChildren,
      peopleCount,
      placeId,
    });
  }
);

export const deleteBookingAction = createAsyncThunk<
  { id: string },
  { id: string },
  {
    state: State;
    extra: AxiosInstance;
  }
>('comments/delete', async ({ id }, { extra: api }) => {
  await api.delete(`${APIRoute.Reservations}/${id}`);

  return { id };
});
