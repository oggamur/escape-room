import { store } from '../store/store.js';
import { AppRoute } from '../const';
import { QuestCardType } from '../types/types';
import { DetailedQuestCardType } from '../types/types';

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

export type BookingProcessState = {
  bookedQuest: BookedQuest[] | null;
  activeBookingData: BookedQuest | null;
  isLoading: boolean;
  hasError: boolean;
};
