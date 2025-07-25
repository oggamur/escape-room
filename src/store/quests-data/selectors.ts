import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { QuestCardType } from '../../types/types';

export const getQuests = (state: State): QuestCardType[] =>
  state[NameSpace.QuestsData].quests;
export const getQuestsIsLoading = (state: State): boolean =>
  state[NameSpace.QuestsData].isLoading;
export const getQuestsHasError = (state: State): boolean =>
  state[NameSpace.QuestsData].hasError;
