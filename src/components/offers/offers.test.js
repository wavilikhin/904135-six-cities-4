import React from 'react';
import renderer from 'react-test-renderer';
import { Offers } from './offers.jsx';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';
import { OFFERS } from '../../test/__mocks__/offers.js';

const mockStore = configureStore([]);

const filtredOffers = [OFFERS[0], OFFERS[1], OFFERS[2]];

const city = 'Amsterdam';

it(`Should render offers component with offers cards and map`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      offers: filtredOffers,
    },
    [NameSpace.STATE]: {
      city: city,
    },
    [NameSpace.USER]: {
      userFavorites: [],
    },
  });

  const tree = renderer
    .create(
      <Provider store={store}>
        <Offers filtredOffers={filtredOffers} city={city} />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
