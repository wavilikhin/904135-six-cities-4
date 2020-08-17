import { createOffer } from '../../adapters/offers.js';

const initialState = {
  offers: [],
  currentOffer: {},
  currentOfferReviews: [],
};

const ActionType = {
  UPDATE_OFFERS: 'UPDATE_OFFERS',
  UPDATE_CURRENT_OFFER: 'UPDATE_CURRENT_OFFER',
  UPDATE_CURRENT_OFFER_REVIEWS: 'UPDATE_CURRENT_OFFER_REVIEWS',
  POST_REVIEW: 'POST_REVIEW',
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

  updateCurrentOfferReviews: (reviews) => ({
    type: ActionType.UPDATE_CURRENT_OFFER_REVIEWS,
    payload: reviews,
  }),
};

const Operation = {
  updateOffers: () => (dispatch, getState, api) => {
    return api.get('/hotels').then((response) => {
      dispatch(ActionCreator.updateOffers(response.data));
    });
  },

  updateCurrentOfferReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`).then((response) => {
      dispatch(ActionCreator.updateCurrentOfferReviews(response.data));
    });
  },

  postReview: (hotelId, reviewData) => (dispatch, getState, api) => {
    return api
      .post(`/comments/${hotelId}`, {
        comment: reviewData.comment,
        rating: parseInt(reviewData.raiting),
      })
      .then((response) => {
        console.log(response);
        dispatch(ActionCreator.updateCurrentOfferReviews(response.data));
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
    case ActionType.UPDATE_CURRENT_OFFER_REVIEWS:
      return Object.assign({}, state, {
        currentOfferReviews: action.payload,
      });
  }
  return state;
};

export { reducer, Operation, ActionType, ActionCreator };
