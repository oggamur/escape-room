import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { AppRoute } from '../../const';

export const getActivePage = (state: State): AppRoute =>
  state[NameSpace.PageProcess].activePage;
