import {
  StateActionTypes,
  StateActions,
  ChangeCityActionType,
  UpdateSortByActionType,
  ChangeHoveredOffer,
} from './types';

import { SortBy, StateStore } from '../types';
import { OfferInfo } from '../../types';

const initialState: StateStore = {
  city: ``,
  sortBy: `popular`,
  hoveredOffer: null,
};

const ActionType: StateActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_BY: `CHANGE_SORT_BY`,
  CHANGE_HOVERED_OFFER: `CHANGE_HOVERED_OFFER`,
};

const ActionCreator = {
  changeCiy: (city: string): ChangeCityActionType => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),

  updateSortBy: (newValue: SortBy): UpdateSortByActionType => ({
    type: ActionType.CHANGE_SORT_BY,
    payload: newValue,
  }),

  changeHoveredOffer: (offer: OfferInfo): ChangeHoveredOffer => ({
    type: ActionType.CHANGE_HOVERED_OFFER,
    payload: offer,
  }),
};

const reducer = (
  state = initialState,
  action: StateActions | { type: `test` },
): StateStore => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        city: action.payload,
      });

    case ActionType.CHANGE_SORT_BY:
      return Object.assign({}, state, {
        sortBy: action.payload,
      });

    case ActionType.CHANGE_HOVERED_OFFER:
      return Object.assign({}, state, {
        hoveredOffer: action.payload,
      });

    default:
      return state;
  }
};

export { reducer, ActionType, ActionCreator };
