import { combineReducers } from '@reduxjs/toolkit';
import { questsData } from '../quests-data/quests-data';
import { NameSpace } from '../../const';

export const rootReducer = combineReducers({
  [NameSpace.QuestsData]: questsData.reducer,
});
