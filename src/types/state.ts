import { store } from '../store/store.js';
import { AppRoute } from '../const';
import { QuestCardType, MyQuestType } from '../types/types';
import { DetailedQuestCardType, UserData } from '../types/types';
import { AuthorizationStatus } from '../const';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type PageProcessState = {
  activePage: AppRoute;
};

export type QuestsState = {
  quests: QuestCardType[];
  isLoading: boolean;
  hasError: boolean;
};

export type SortingProcessState = {
  sortLevelType: string;
  sortGenreType: string;
};

export type DetailedProcessState = {
  detailedQuest: DetailedQuestCardType | null;
  isLoading: boolean;
  hasError: boolean;
};

export type SlotsType = {
  time: string;
  isAvailable: boolean;
};

export type BookedQuest = {
  id: string;
  location: {
    address: string;
    coords: number[];
  };
  slots: {
    today: SlotsType[];
    tomorrow: SlotsType[];
  };
};

export type DataToSendType = {
  date: string | null;
  time: string | null;
  contactPerson: string | null;
  phone: string | null;
  withChildren: boolean;
  peopleCount: number | null;
  placeId: string | null | undefined;
};

export type BookingProcessState = {
  bookedQuest: BookedQuest[] | null;
  activeBookingData: BookedQuest | null;
  isLoading: boolean;
  hasError: boolean;
  dataToSend: DataToSendType;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData;
  isLoading: boolean;
  hasError: boolean;
};

export type MyQuestsData = {
  bookedQuestsData: MyQuestType[] | [];
  isLoading: boolean;
  hasError: boolean;
};
