import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { MyQuestType } from '../../types/types';

export const getMyBookedQuests = (state: State): MyQuestType[] | [] =>
  state[NameSpace.MyQuestsData].bookedQuestsData;
export const getMyQuestsIsLoading = (state: State): boolean =>
  state[NameSpace.MyQuestsData].isLoading;
export const getMyQuestsHasError = (state: State): boolean =>
  state[NameSpace.MyQuestsData].hasError;
