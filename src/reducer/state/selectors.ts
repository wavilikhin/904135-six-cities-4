import NameSpace from '../name-space';
import { StateStore, SortBy } from './types';

export const getCity = (state: StateStore): string => {
  return state[NameSpace.STATE].city;
};

export const getSortByValue = (state: StateStore): SortBy => {
  return state[NameSpace.STATE].sortBy;
};
