import { OfferInfo } from '../../types';
import { SortBy } from '../types';

const CHANGE_CITY = `CHANGE_CITY`;
const CHANGE_SORT_BY = `CHANGE_SORT_BY`;
const CHANGE_HOVERED_OFFER = `CHANGE_HOVERED_OFFER`;

export type StateActionTypes = {
  CHANGE_CITY: typeof CHANGE_CITY;
  CHANGE_SORT_BY: typeof CHANGE_SORT_BY;
  CHANGE_HOVERED_OFFER: typeof CHANGE_HOVERED_OFFER;
};

export type ChangeCityActionType = {
  type: string;
  payload: string;
};

export type UpdateSortByActionType = {
  type: typeof CHANGE_SORT_BY;
  payload: SortBy | '';
};

export type ChangeHoveredOffer = {
  type: typeof CHANGE_HOVERED_OFFER;
  payload: OfferInfo;
};

export type StateActions =
  | ChangeCityActionType
  | UpdateSortByActionType
  | ChangeHoveredOffer;
