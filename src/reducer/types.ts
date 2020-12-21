import { OfferInfo, ReviewItem } from '../types';
import NameSpace from './name-space';
import { DataActions } from './data/types';
import { StateActions } from './state/types';
import { UserActionTypes } from './user/types';

type AuthStatus = 'AUTH' | 'NO_AUTH';
export type SortBy = 'highToLow' | 'lowToHigh' | 'popular' | 'topRatedFirst';

export type StateStore = {
  city: string;
  sortBy: SortBy;
  focusedOfferId: number;
};

export type DataStore = {
  offers: OfferInfo[];
  currentOffer: OfferInfo | {};
  currentOfferReviews: ReviewItem[];
  currentOfferNearby: OfferInfo[];
};

export type UserStore = {
  authStatus: AuthStatus;
  userEmail: string;
  userFavorites: OfferInfo[];
};

export type Store = {
  [NameSpace.DATA]: DataStore;
  [NameSpace.STATE]: StateStore;
  [NameSpace.USER]: UserStore;
};

export type AppActionCreator = DataActions | StateActions | UserActionTypes;
