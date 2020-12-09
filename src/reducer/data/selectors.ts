import { createSelector } from 'reselect';
import { OfferInfo, ReviewItem } from '../../types';
import NameSpace from '../name-space';
import { getCity, getSortByValue } from '../state/selectors';
import { SortBy } from '../state/types';
import { AppStateType } from '../reducer';

export const getUniqueCities = (state: AppStateType): string[] => {
  return <Array<string>>(
    [
      ...new Set(
        state[NameSpace.DATA].offers.map(
          (offer: OfferInfo): string => offer.city,
        ),
      ),
    ].sort()
  );
};

export const getOffers = (state: AppStateType): OfferInfo[] => {
  return state[NameSpace.DATA].offers;
};

export const getCurrentOffer = (state: AppStateType): OfferInfo | {} => {
  return state[NameSpace.DATA].currentOffer;
};

export const getCurrentOfferReviews = (state: AppStateType): ReviewItem[] => {
  return state[NameSpace.DATA].currentOfferReviews;
};

export const getCurrentOfferNearby = (state: AppStateType): OfferInfo[] => {
  return state[NameSpace.DATA].currentOfferNearby;
};

export const getFiltredOffers = createSelector(
  getCity,
  getOffers,
  (city: string, offers: OfferInfo[]): OfferInfo[] => {
    return offers.filter((offer) => {
      return offer.city === city;
    });
  },
);

export const getSortedFiltredOffers = createSelector(
  getSortByValue,
  getFiltredOffers,
  (sortByValue: SortBy, filtredOffers: OfferInfo[]): OfferInfo[] => {
    switch (sortByValue) {
      case `highToLow`:
        return [...filtredOffers].sort((a, b) => b.priceValue - a.priceValue);

      case `lowToHigh`:
        return [...filtredOffers].sort((a, b) => a.priceValue - b.priceValue);

      case `topRatedFirst`:
        return [...filtredOffers].sort((a, b) => b.raiting - a.raiting);

      default:
        return [...filtredOffers].sort(
          (a, b) => b.goods.length - a.goods.length,
        );
    }
  },
);
