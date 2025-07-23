import { store } from '../store/store.js';
import { AppRoute } from '../const';
import { QuestCardType } from '../types/types';
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
