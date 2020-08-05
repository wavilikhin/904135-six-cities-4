import { createSelector } from 'reselect';
import NameSpace from '../name-space.js';

export const getCity = (state) => {
  return state[NameSpace.STATE].city;
};

export const getUniqueCities = (state) => {
  return [...new Set(state[NameSpace.DATA].offers.map((offer) => offer.city))];
};

export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
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
