import offers from './__mocks__/offers';

const initialState = {
  city: null,
  offers,
};

const ActionType = {
  CHANGE_CITY: 'CHANGE_CITY',
};

const filterValues = (values, keyToFilter, valueToFilter) => {
  return values.filter((value) => value[keyToFilter] === valueToFilter);
};

const ActionCreator = {
  changeCiy: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        city: action.payload,
      });
  }
  return state;
};

export { reducer, ActionType, ActionCreator };
