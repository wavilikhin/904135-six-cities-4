import NameSpace from '../../reducer/name-space.js';
export const mockedStore = {
  [NameSpace.DATA]: {
    offers: [],
    currentOffer: {},
    currentOfferReviews: [],
    currentOfferNearby: [],
  },
  [NameSpace.STATE]: {
    city: ``,
  },
  [NameSpace.USER]: {
    authStatus: `NO_AUTH`,
    userEmail: ``,
    userFavorites: [],
  },
};
