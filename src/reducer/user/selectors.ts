import NameSpace from '../name-space';
import { AuthStatus } from '../../const';
import { OfferInfo } from '../../types';
import { AppStateType } from '../reducer';

export const getAuthStatus = (state: AppStateType): AuthStatus => {
  return state[NameSpace.USER].authStatus;
};

export const getUserEmail = (state: AppStateType): string => {
  return state[NameSpace.USER].userEmail;
};

export const getUserFavorites = (state: AppStateType): OfferInfo[] => {
  return state[NameSpace.USER].userFavorites;
};
