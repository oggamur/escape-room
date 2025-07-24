import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { BookedQuest } from '../../types/state';

export const getBookingQuestData = (state: State): BookedQuest[] | null =>
  state[NameSpace.BookingProcess].bookedQuest;
export const getBookingQuestIsLoading = (state: State): boolean =>
  state[NameSpace.BookingProcess].isLoading;
export const getBookingQuestHasError = (state: State): boolean =>
  state[NameSpace.BookingProcess].hasError;
export const getActiveBookingData = (state: State): BookedQuest | null =>
  state[NameSpace.BookingProcess].activeBookingData;
