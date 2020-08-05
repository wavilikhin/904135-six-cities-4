import { createOffer } from '../../adapters/offers.js';

const initialState = {
  offers: [],
};

const ActionType = {
  UPDATE_OFFERS: 'UPDATE_OFFERS',
};

const ActionCreator = {
  updateOffers: (offers) => {
    const updatedOffers = offers.map((offer) => {
      return createOffer(offer);
    });

    return {
      type: ActionType.UPDATE_OFFERS,
      payload: updatedOffers,
    };
  },
};

const Operation = {
  updateOffers: () => (dispatch, getState, api) => {
    return api.get('/hotels').then((response) => {
      dispatch(ActionCreator.updateOffers(response.data));
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload,
      });
  }
  return state;
};

export { reducer, Operation, ActionType, ActionCreator };
