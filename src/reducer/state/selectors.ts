import NameSpace from '../name-space';
import { SortBy } from '../types';
import { AppStateType } from '../reducer';

export const getCity = (state: AppStateType): string => {
  return state[NameSpace.STATE].city;
};

export const getSortByValue = (state: AppStateType): SortBy => {
  return state[NameSpace.STATE].sortBy;
};
