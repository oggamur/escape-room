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
