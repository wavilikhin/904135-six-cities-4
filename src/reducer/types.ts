import { OfferInfo, ReviewItem } from '../types';
import { StateStore } from './state/types';
import NameSpace from './name-space';

type AuthStatus = 'AUTH' | 'NO_AUTH';

export type DataStore = {
  offers: OfferInfo[];
  currentOffer: OfferInfo | {};
  currentOfferReviews: ReviewItem[];
  currentOfferNearby: OfferInfo[];
};

export type UserState = {
  authStatus: AuthStatus;
  userEmail: string;
  userFavorites: OfferInfo[];
};

export type Store = {
  [NameSpace.DATA]: DataStore;
  [NameSpace.STATE]: StateStore;
  [NameSpace.USER]: UserState;
};
