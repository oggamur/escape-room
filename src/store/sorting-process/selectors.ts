import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getSortLevelType = (state: State): string =>
  state[NameSpace.SortingProcess].sortLevelType;

export const getSortGenreType = (state: State): string =>
  state[NameSpace.SortingProcess].sortGenreType;
