import * as React from 'react';
import renderer from 'react-test-renderer';
import { Offers } from './offers.js';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from '../../history.js';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';
import { OFFERS } from '../../test/__mocks__/offers.js';

const mockStore = configureStore([]);

const filtredOffers = [OFFERS[0], OFFERS[1], OFFERS[2]];

const city = 'Amsterdam';

describe(`Offers component snapshot test`, () => {
  it(`Should render offers component with offers cards and map`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        offers: filtredOffers,
      },
      [NameSpace.STATE]: {
        city: city,
      },
      [NameSpace.USER]: {
        authStatus: 'NO_AUTH',
        userEmail: '',
        userFavorites: [],
      },
    });

    const tree = renderer
      .create(
        <Router history={history}>
          <Provider store={store}>
            <Offers filtredOffers={filtredOffers} city={city} />
          </Provider>
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
