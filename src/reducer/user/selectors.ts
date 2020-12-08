import NameSpace from '../name-space';
import { AuthStatus } from '../../const';
import { UserState } from './types';
import { OfferInfo } from '../../types';

export const getAuthStatus = (state: UserState): AuthStatus => {
  return state[NameSpace.USER].authStatus;
};

export const getUserEmail = (state: UserState): string => {
  return state[NameSpace.USER].userEmail;
};

export const getUserFavorites = (state: UserState): OfferInfo[] => {
  return state[NameSpace.USER].userFavorites;
};
