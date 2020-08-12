import React from 'react';
import renderer from 'react-test-renderer';
import { OffersList } from './offers-list.jsx';
import { OFFERS } from '../../test/__mocks__/offers.js';

const offersDataArray = OFFERS;
const currentCity = 'Amsterdam';

describe('OffersList component snapshot test', () => {
  it(`Should render a list offers`, () => {
    const tree = renderer
      .create(
        <OffersList
          onActiveItemChange={() => {}}
          offersArray={offersDataArray}
          currentCity={currentCity}
          userFavorites={[]}
          onFavoritesUpdate={() => {}}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
