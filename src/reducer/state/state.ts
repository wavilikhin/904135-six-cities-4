import {
  StateActionTypes,
  StateActions,
  ChangeCityActionType,
  UpdateSortByActionType,
  ChangeFocusedOfferType,
} from './types';

import { SortBy, StateStore } from '../types';

const initialState: StateStore = {
  city: ``,
  sortBy: `popular`,
  focusedOfferId: -1,
};

const ActionType: StateActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_BY: `CHANGE_SORT_BY`,
  CHANGE_FOCUSED_OFFER: 'CHANGE_FOCUSED_OFFER',
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

  changeFocusedOffer: (id: number): ChangeFocusedOfferType => ({
    type: ActionType.CHANGE_FOCUSED_OFFER,
    payload: id,
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

    case ActionType.CHANGE_FOCUSED_OFFER:
      return Object.assign({}, state, {
        focusedOfferId: action.payload,
      });

    default:
      return state;
  }
};

export { reducer, ActionType, ActionCreator };
