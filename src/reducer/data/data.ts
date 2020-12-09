import { AxiosInstance } from 'axios';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { createOffer } from '../../adapters/offers';
import { OfferInfo, ReviewItem, Comment } from '../../types';
import { AppStateType } from '../reducer';
// TODO: Подумать над тем что должно находиться в редьюсере с Датой а что со Стейтом
import {
  DataState,
  DataActionTypes,
  DataActions,
  UpdateOffersAction,
  UpdateCurrentOfferAction,
  UpdateCurrentOfferNearbyAction,
  UpdateCurrentOfferReviewsAction,
} from './types';

const initialState: DataState = {
  offers: [],
  currentOffer: {},
  currentOfferReviews: [],
  currentOfferNearby: [],
};

const ActionType: DataActionTypes = {
  UPDATE_OFFERS: `UPDATE_OFFERS`,
  UPDATE_CURRENT_OFFER: `UPDATE_CURRENT_OFFER`,
  UPDATE_CURRENT_OFFER_REVIEWS: `UPDATE_CURRENT_OFFER_REVIEWS`,
  POST_REVIEW: `POST_REVIEW`,
  UPDATE_CURRENT_OFFER_NEARBY: `UPDATE_CURRENT_OFFER_NEARBY`,
};

const ActionCreator = {
  updateOffers: (offers: OfferInfo[]): UpdateOffersAction => {
    const updatedOffers = offers.map((offer) => {
      return createOffer(offer);
    });

    return {
      type: ActionType.UPDATE_OFFERS,
      payload: updatedOffers,
    };
  },

  updateCurrentOffer: (id: number): UpdateCurrentOfferAction => ({
    type: ActionType.UPDATE_CURRENT_OFFER,
    payload: id,
  }),

  updateCurrentOfferNearby: (
    offers: OfferInfo[],
  ): UpdateCurrentOfferNearbyAction => {
    let udaptedOffers = offers.map((offer) => {
      return createOffer(offer);
    });
    return {
      type: ActionType.UPDATE_CURRENT_OFFER_NEARBY,
      payload: udaptedOffers,
    };
  },

  updateCurrentOfferReviews: (
    reviews: ReviewItem[],
  ): UpdateCurrentOfferReviewsAction => ({
    type: ActionType.UPDATE_CURRENT_OFFER_REVIEWS,
    payload: reviews,
  }),
};

const Operation = {
  updateOffers: (): ThunkAction<
    Promise<void>,
    AppStateType,
    unknown,
    DataActions
  > => async (dispatch, _getState, api: AxiosInstance): Promise<void> => {
    const getOffersRequest = await api.get(`/hotels`);
    dispatch(ActionCreator.updateOffers(getOffersRequest.data));
  },

  getOfferComments: (
    id: number,
  ): ThunkAction<Promise<void>, AppStateType, unknown, DataActions> => async (
    dispatch,
    _getState,
    api: AxiosInstance,
  ) => {
    const getOfferCommentsRequest = await api.get(`/comments/${id}`);
    dispatch(
      ActionCreator.updateCurrentOfferReviews(getOfferCommentsRequest.data),
    );
  },

  updateOfferNearby: (
    id: number,
  ): ThunkAction<Promise<void>, AppStateType, unknown, DataActions> => async (
    dispatch,
    _getState,
    api: AxiosInstance,
  ) => {
    const updateOfferNearbyRequest = await api.get(`/hotels/${id}/nearby`);
    dispatch(
      ActionCreator.updateCurrentOfferNearby(updateOfferNearbyRequest.data),
    );
  },

  postReview: (
    hotelId: number,
    reviewData: Comment,
  ): ThunkAction<Promise<void>, AppStateType, unknown, DataActions> => async (
    dispatch,
    _getState,
    api: AxiosInstance,
  ) => {
    const postReviewRequest = await api.post(`/comments/${hotelId}`, {
      comment: reviewData.comment,
      rating: reviewData.raiting,
    });
    dispatch(ActionCreator.updateCurrentOfferReviews(postReviewRequest.data));
  },
};

const reducer = (state = initialState, action: DataActions) => {
  switch (action.type) {
    case ActionType.UPDATE_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload,
      });

    case ActionType.UPDATE_CURRENT_OFFER:
      let currentOffer = state.offers.find(
        (offer) => offer.id === action.payload,
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
    default:
      return state;
  }
  // return state;
};

export { reducer, Operation, ActionType, ActionCreator };
