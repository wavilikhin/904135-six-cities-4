import React from 'react';
import renderer from 'react-test-renderer';
import { OffersList } from './offers-list.jsx';
import { Router } from 'react-router-dom';
import history from '../../history.js';
import { OFFERS } from '../../test/__mocks__/offers.js';

const offersDataArray = OFFERS;

describe('OffersList component snapshot test', () => {
  it(`Should render a list offers`, () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <OffersList
            filtredOffers={offersDataArray}
            userFavorites={[]}
            onFavoritesUpdate={() => {}}
          />
        </Router>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
