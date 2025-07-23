import { combineReducers } from '@reduxjs/toolkit';
import { questsData } from '../quests-data/quests-data';
import { pageProcess } from '../page-process/page-process';
import { sortingProcess } from '../sorting-process/sorting-process';
import { NameSpace } from '../../const';

export const rootReducer = combineReducers({
  [NameSpace.QuestsData]: questsData.reducer,
  [NameSpace.PageProcess]: pageProcess.reducer,
  [NameSpace.SortingProcess]: sortingProcess.reducer,
});
