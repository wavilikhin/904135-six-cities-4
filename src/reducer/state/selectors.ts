import NameSpace from '../name-space';
import { SortBy } from '../types';
import { AppStateType } from '../reducer';
import { OfferInfo } from '../../types';

export const getCity = (state: AppStateType): string => {
  return state[NameSpace.STATE].city;
};

export const getSortByValue = (state: AppStateType): SortBy => {
  return state[NameSpace.STATE].sortBy;
};

export const getHoveredOffer = (state: AppStateType): OfferInfo => {
  return state[NameSpace.STATE].hoveredOffer;
};
