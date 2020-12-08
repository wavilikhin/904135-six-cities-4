export type SortBy = 'highToLow' | 'lowToHigh' | 'popular' | 'topRatedFirst';

const CHANGE_CITY = `CHANGE_CITY`;
const CHANGE_SORT_BY = `CHANGE_SORT_BY`;

export type StateActionTypes = {
  CHANGE_CITY: typeof CHANGE_CITY;
  CHANGE_SORT_BY: typeof CHANGE_SORT_BY;
};

export type ChangeCityActionType = {
  type: typeof CHANGE_CITY;
  payload: string;
};

export type UpdateSortByActionType = {
  type: typeof CHANGE_SORT_BY;
  payload: SortBy;
};

export type StateActions = ChangeCityActionType | UpdateSortByActionType;

export type StateStore = {
  city: string;
  sortBy: SortBy;
};
