import { createSelector } from 'reselect';
import NameSpace from '../name-space';

export const getCity = (state) => {
  return state[NameSpace.STATE].city;
};

export const getUniqueCities = (state) => {
  return [
    ...new Set(state[NameSpace.DATA].offers.map((offer) => offer.city)),
  ].sort();
};

export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

export const getSortByValue = (state) => {
  return state[NameSpace.STATE].sortBy;
};

export const getFiltredOffers = createSelector(
  getCity,
  getOffers,
  (city, offers) => {
    return offers.filter((offer) => {
      return offer.city === city;
    });
  },
);

export const getSortedFiltredOffers = createSelector(
  getSortByValue,
  getFiltredOffers,
  (sortByValue, filtredOffers) => {
    switch (sortByValue) {
      case `highToLow`:
        return [...filtredOffers].sort((a, b) => b.priceValue - a.priceValue);

      case `lowToHigh`:
        return [...filtredOffers].sort((a, b) => a.priceValue - b.priceValue);

      case `topRatedFirst`:
        return [...filtredOffers].sort((a, b) => b.rating - a.rating);

      default:
        return [...filtredOffers].sort(
          (a, b) => b.goods.length - a.goods.length,
        );
    }
  },
);

export const getCurrentOffer = (state) => {
  return state[NameSpace.DATA].currentOffer;
};

export const getCurrentOfferReviews = (state) => {
  return state[NameSpace.DATA].currentOfferReviews;
};

export const getCurrentOfferNearby = (state) => {
  return state[NameSpace.DATA].currentOfferNearby;
};
