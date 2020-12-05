const initialState = {
  city: ``,
  sortBy: `popular`,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_BY: `CHANGE_SORT_BY`,
};

const ActionCreator = {
  changeCiy: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  updateSortBy: (newValue) => ({
    type: ActionType.CHANGE_SORT_BY,
    payload: newValue,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        city: action.payload,
      });
    case ActionType.CHANGE_SORT_BY:
      return Object.assign({}, state, {
        sortBy: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
