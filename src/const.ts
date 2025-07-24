export enum AppRoute {
  MAIN = '/',
  LOGIN = '/login',
  MY_QUESTS = '/my-quests',
  BOOKING = '/booking/:id',
  QUEST = '/quest/:id',
  CONTACTS = '/contacts',
  NOT_FOUND = '*',
  ERROR = '/error',
}

export enum APIRoute {
  QuestsList = '/quest',
  Quest = '/quest',
  Booking = '/booking',
  Reservations = '/reservation',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  AUTH = 'AUTH',
  NO_AUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN',
}

export enum SortGenreType {
  ALL = 'all',
  ADVENTURE = 'adventure',
  HORROR = 'horror',
  MYSTIC = 'mystic',
  DETECTIVE = 'detective',
  SCI_FI = 'sci-fi',
}

export const filterGenreButtonsData = {
  [SortGenreType.ALL]: 'Все квесты',
  [SortGenreType.ADVENTURE]: 'Приключения',
  [SortGenreType.HORROR]: 'Ужасы',
  [SortGenreType.MYSTIC]: 'Мистика',
  [SortGenreType.DETECTIVE]: 'Детектив',
  [SortGenreType.SCI_FI]: 'Sci-fi',
};

export enum SortLevelType {
  ANY = 'any',
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export const filterLevelButtonsData = {
  [SortLevelType.ANY]: 'Любой',
  [SortLevelType.EASY]: 'Легкий',
  [SortLevelType.MEDIUM]: 'Средний',
  [SortLevelType.HARD]: 'Сложный',
};

export enum NameSpace {
  QuestsData = 'QUESTS_DATA',
  SortingProcess = 'SORTING_PROCESS',
  DetailedProcess = 'DETAILED_PROCESS',
  BookingProcess = 'BOOKING_PROCESS',
}

export const URL_MARKER_DEFAULT = '../markup/img/svg/pin-default.svg';
export const URL_MARKER_CURRENT = '../markup/img/svg/pin-active.svg';

export const SPB_COORDS = [59.938886, 30.713838];
