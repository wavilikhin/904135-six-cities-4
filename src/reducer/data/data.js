import { createOffer } from '../../adapters/offers';

const initialState = {
  offers: [],
  currentOffer: {},
  currentOfferReviews: [],
  currentOfferNearby: [],
};

const ActionType = {
  UPDATE_OFFERS: `UPDATE_OFFERS`,
  UPDATE_CURRENT_OFFER: `UPDATE_CURRENT_OFFER`,
  UPDATE_CURRENT_OFFER_REVIEWS: `UPDATE_CURRENT_OFFER_REVIEWS`,
  POST_REVIEW: `POST_REVIEW`,
  UPDATE_CURRENT_OFFER_NEARBY: `UPDATE_CURRENT_OFFER_NEARBY`,
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

  updateCurrentOfferNearby: (offers) => {
    let udaptedOffers = offers.map((offer) => {
      return createOffer(offer);
    });
    return {
      type: ActionType.UPDATE_CURRENT_OFFER_NEARBY,
      payload: udaptedOffers,
    };
  },

  updateCurrentOfferReviews: (reviews) => ({
    type: ActionType.UPDATE_CURRENT_OFFER_REVIEWS,
    payload: reviews,
  }),
};

const Operation = {
  updateOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`).then((response) => {
      dispatch(ActionCreator.updateOffers(response.data));
    });
  },

  updateCurrentOfferReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`).then((response) => {
      dispatch(ActionCreator.updateCurrentOfferReviews(response.data));
    });
  },

  updateCurrentOfferNearby: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`).then((response) => {
      dispatch(ActionCreator.updateCurrentOfferNearby(response.data));
    });
  },

  postReview: (hotelId, reviewData) => (dispatch, getState, api) => {
    return api
      .post(`/comments/${hotelId}`, {
        comment: reviewData.comment,
        rating: parseInt(reviewData.raiting, 10),
      })
      .then((response) => {
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
      let currentOffer = state.offers.find(
        (offer) => offer.id === parseInt(action.payload, 10),
      );

      return Object.assign({}, state, {
        currentOffer,
      });

    case ActionType.UPDATE_CURRENT_OFFER_NEARBY:
      return Object.assign({}, state, {
        currentOfferNearby: action.payload,
      });

    case ActionType.UPDATE_CURRENT_OFFER_REVIEWS:
      return Object.assign({}, state, {
        currentOfferReviews: action.payload,
      });
  }
  return state;
};

export { reducer, Operation, ActionType, ActionCreator };
