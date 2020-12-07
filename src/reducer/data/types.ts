import { OfferInfo, ReviewItem } from '../../types';

export type DataState = {
  offers: OfferInfo[];
  currentOffer: OfferInfo | {};
  currentOfferReviews: ReviewItem[];
  currentOfferNearby: OfferInfo[];
};

const UPDATE_OFFERS = `UPDATE_OFFERS`;
const UPDATE_CURRENT_OFFER = `UPDATE_CURRENT_OFFER`;
const UPDATE_CURRENT_OFFER_REVIEWS = `UPDATE_CURRENT_OFFER_REVIEWS`;
const POST_REVIEW = `POST_REVIEW`;
const UPDATE_CURRENT_OFFER_NEARBY = `UPDATE_CURRENT_OFFER_NEARBY`;

export type DataActionTypes = {
  UPDATE_OFFERS: typeof UPDATE_OFFERS;
  UPDATE_CURRENT_OFFER: typeof UPDATE_CURRENT_OFFER;
  UPDATE_CURRENT_OFFER_REVIEWS: typeof UPDATE_CURRENT_OFFER_REVIEWS;
  POST_REVIEW: typeof POST_REVIEW;
  UPDATE_CURRENT_OFFER_NEARBY: typeof UPDATE_CURRENT_OFFER_NEARBY;
};

export type UpdateOffersAction = {
  type: typeof UPDATE_OFFERS;
  payload: OfferInfo[];
};

export type UpdateCurrentOfferAction = {
  type: typeof UPDATE_CURRENT_OFFER;
  payload: number;
};

export type UpdateCurrentOfferNearbyAction = {
  type: typeof UPDATE_CURRENT_OFFER_NEARBY;
  payload: OfferInfo[];
};

export type UpdateCurrentOfferReviewsAction = {
  type: typeof UPDATE_CURRENT_OFFER_REVIEWS;
  payload: ReviewItem[];
};

export type DataActions =
  | UpdateOffersAction
  | UpdateCurrentOfferAction
  | UpdateCurrentOfferNearbyAction
  | UpdateCurrentOfferReviewsAction;
