import { QuestCardType } from '../types/types';

export const sortQuests = (
  quests: QuestCardType[],
  sortLevelType: string,
  sortGenreType: string
) => {
  if (sortLevelType === 'any' && sortGenreType === 'all') {
    return quests;
  } else {
    return quests.filter(
      (quest) =>
        (sortLevelType === 'any' || quest.level === sortLevelType) &&
        (sortGenreType === 'all' || quest.type === sortGenreType)
    );
  }
};
