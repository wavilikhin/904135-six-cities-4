import { SortBy } from '../types';

const CHANGE_CITY = `CHANGE_CITY`;
const CHANGE_SORT_BY = `CHANGE_SORT_BY`;
const CHANGE_FOCUSED_OFFER = `CHANGE_FOCUSED_OFFER`;

export type StateActionTypes = {
  CHANGE_CITY: typeof CHANGE_CITY;
  CHANGE_SORT_BY: typeof CHANGE_SORT_BY;
  CHANGE_FOCUSED_OFFER: typeof CHANGE_FOCUSED_OFFER;
};

export type ChangeCityActionType = {
  type: string;
  payload: string;
};

export type UpdateSortByActionType = {
  type: typeof CHANGE_SORT_BY;
  payload: SortBy | '';
};

export type ChangeFocusedOfferType = {
  type: typeof CHANGE_FOCUSED_OFFER;
  payload: number;
};

export type StateActions =
  | ChangeCityActionType
  | UpdateSortByActionType
  | ChangeFocusedOfferType;
