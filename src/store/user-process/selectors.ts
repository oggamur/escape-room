import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserData } from '../../types/types';

export const getUserData = (state: State): UserData =>
  state[NameSpace.User].userData;
export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;
export const getUserIsLoading = (state: State): boolean =>
  state[NameSpace.User].isLoading;
export const getUserHasError = (state: State): boolean =>
  state[NameSpace.User].hasError;
