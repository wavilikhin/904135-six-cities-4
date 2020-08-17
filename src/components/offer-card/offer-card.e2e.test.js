import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OfferCard from './offer-card.jsx';
import { OFFERS } from '../../test/__mocks__/offers.js';

const cardData = OFFERS[0];
const userFavorites = [];

configure({
  adapter: new Adapter(),
});

describe(`OfferCard component e2e test`, () => {
  it(`Should handleFavoritesUpdate be called once with id value = 1`, () => {
    const updateFavorites = jest.fn((val) => val);

    const offerCard = shallow(
      <OfferCard
        cardData={cardData}
        handleFavoritesUpdate={updateFavorites}
        userFavorites={userFavorites}
      />,
    );

    const addToFavoritesButton = offerCard.find(
      `button.place-card__bookmark-button`,
    );

    addToFavoritesButton.simulate(`click`, { preventDefault() {} });

    expect(updateFavorites.mock.results[0].value).toBe(1);
    expect(updateFavorites).toHaveBeenCalledTimes(1);
  });
});
