import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card.jsx';
import { OFFERS } from '../../test/__mocks__/offers.js';

const cardData = OFFERS[0];

describe(`OfferCard component snapshot test`, () => {
  it(`Should render content card with given data`, () => {
    const tree = renderer
      .create(
        <OfferCard
          handleHover={() => {}}
          cardData={cardData}
          userFavorites={[]}
          handleFavoritesUpdate={() => {}}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
