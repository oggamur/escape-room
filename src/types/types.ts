import { SortLevelType, SortGenreType } from '../const';

export type QuestCardType = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: SortLevelType;
  type: SortGenreType;
  peopleMinMax: number[];
};

export type QuestCardScreenType = {
  cardProps: QuestCardType;
};

export type DetailedQuestCardType = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: SortLevelType;
  type: SortGenreType;
  peopleMinMax: number[];
  description: string;
  coverImg: string;
  coverImgWebp: string;
};

export type UserData = {
  email: null | string;
  avatarUrl: string;
  isPro: boolean;
  name: string;
  token: string;
};

export type AuthData = {
  login: string;
  password: string;
};

export type MyQuestType = {
  date: string;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  id: string;
  location: {
    address: string;
    coords: number[];
  };
  quest: QuestCardType;
};
