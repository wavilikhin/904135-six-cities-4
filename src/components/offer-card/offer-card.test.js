import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card.jsx';
import { Router } from 'react-router-dom';
import history from '../../history.js';
import { OFFERS } from '../../test/__mocks__/offers.js';

const cardData = OFFERS[0];

describe(`OfferCard component snapshot test`, () => {
  it(`Should render content card with given data`, () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <OfferCard
            cardData={cardData}
            userFavorites={[]}
            handleFavoritesUpdate={() => {}}
          />
        </Router>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
