import {
  StateStore,
  StateActionTypes,
  StateActions,
  ChangeCityActionType,
  UpdateSortByActionType,
  SortBy,
} from './types';

const initialState: StateStore = {
  city: ``,
  sortBy: `popular`,
};

const ActionType: StateActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_BY: `CHANGE_SORT_BY`,
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

    default:
      return state;
  }
  // return state;
};

export { reducer, ActionType, ActionCreator };
