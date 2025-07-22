import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { QuestCardType } from '../../types/types';

export const getQuests = (state: State): QuestCardType[] =>
  state[NameSpace.QuestsData].quests;
