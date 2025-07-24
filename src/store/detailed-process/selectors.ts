import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { DetailedQuestCardType } from '../../types/types';

export const getDetailedOfferData = (
  state: State
): DetailedQuestCardType | null =>
  state[NameSpace.DetailedProcess].detailedOffer;
export const getDetailedOfferIsLoading = (state: State): boolean =>
  state[NameSpace.DetailedProcess].isLoading;
export const getDetailedOfferHasError = (state: State): boolean =>
  state[NameSpace.DetailedProcess].hasError;
