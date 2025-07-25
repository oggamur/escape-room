import { combineReducers } from '@reduxjs/toolkit';
import { questsData } from '../quests-data/quests-data';
import { sortingProcess } from '../sorting-process/sorting-process';
import { NameSpace } from '../../const';
import { detailedProcess } from '../detailed-process/detailed-process';
import { bookingProcess } from '../booking-process/booking-process';
import { userProcess } from '../user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.QuestsData]: questsData.reducer,
  [NameSpace.SortingProcess]: sortingProcess.reducer,
  [NameSpace.DetailedProcess]: detailedProcess.reducer,
  [NameSpace.BookingProcess]: bookingProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
