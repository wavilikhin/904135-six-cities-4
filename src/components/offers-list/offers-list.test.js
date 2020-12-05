// main
import * as React from 'react';
import renderer from 'react-test-renderer';
// router
import { Router } from 'react-router-dom';
import history from '../../history.js';
// store
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// data
import mockedData, { mockedStore } from '../../test/__mocks__/store.js';
import { OffersList } from './offers-list.jsx';
import { OFFERS } from '../../test/__mocks__/offers.js';

const mockStore = configureStore([]);
const store = mockStore(mockedStore);
const offersDataArray = OFFERS;

describe('OffersList component snapshot test', () => {
  it(`Should render a list offers`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <OffersList filtredOffers={offersDataArray} />
          </Router>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
