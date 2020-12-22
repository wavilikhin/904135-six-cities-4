import NameSpace from '../../reducer/name-space';
import { Store } from '../../reducer/types';

export const StateStore = {
  city: ``,
  sortBy: `popular`,
};

export const testStore: Store = {
  [NameSpace.DATA]: {
    offers: [],
    currentOffer: {},
    currentOfferReviews: [],
    currentOfferNearby: [],
  },
  [NameSpace.STATE]: {
    city: ``,
    sortBy: 'popular',
    hoveredOffer: null,
  },
  [NameSpace.USER]: {
    authStatus: `NO_AUTH`,
    userEmail: ``,
    userFavorites: [],
  },
};
