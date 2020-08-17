import { createOffer } from '../../adapters/offers.js';

const initialState = {
  offers: [],
  currentOffer: {},
};

const ActionType = {
  UPDATE_OFFERS: 'UPDATE_OFFERS',
  UPDATE_CURRENT_OFFER: 'UPDATE_CURRENT_OFFER',
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

  updateCurrentOffer: (id) => ({
    type: ActionType.UPDATE_CURRENT_OFFER,
    payload: id,
  }),
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

    case ActionType.UPDATE_CURRENT_OFFER:
      const currentOffer = state.offers.find(
        (offer) => offer.id === action.payload,
      );
      return Object.assign({}, state, {
        currentOffer: currentOffer,
      });
  }
  return state;
};

export { reducer, Operation, ActionType, ActionCreator };
