import * as React from 'react';
import renderer from 'react-test-renderer';

import { OFFERS } from '../../test/__mocks__/offers';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mockedStore } from '../../test/__mocks__/store.js';

import { Router } from 'react-router-dom';
import history from '../../history.js';

import { Room } from './room.js';

const mockStore = configureStore([]);
const offerInfo = OFFERS[0];
const offersNearby = [OFFERS[1], OFFERS[2], OFFERS[3]];
const favoritesIds = [1, 2, 3];
const reviews = [];

describe(`Room component snapshot test`, () => {
  it(`Should render room offer page`, () => {
    const store = mockStore(mockedStore);

    const tree = renderer
      .create(
        <Router history={history}>
          <Provider store={store}>
            <Room
              offer={offerInfo}
              offerId={1}
              favoritesIds={favoritesIds}
              reviews={reviews}
              updateReviews={() => {}}
              offersNearby={offersNearby}
              updateNearby={() => {}}
              handleFavoritesUpdate={() => {}}
              handleCurrentOfferUpdate={() => {}}
            />
          </Provider>
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
