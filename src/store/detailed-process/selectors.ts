import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { DetailedQuestCardType } from '../../types/types';

export const getDetailedQuestData = (
  state: State
): DetailedQuestCardType | null =>
  state[NameSpace.DetailedProcess].detailedQuest;
export const getDetailedQuestIsLoading = (state: State): boolean =>
  state[NameSpace.DetailedProcess].isLoading;
export const getDetailedQuestHasError = (state: State): boolean =>
  state[NameSpace.DetailedProcess].hasError;
