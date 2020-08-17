import React from 'react';
import renderer from 'react-test-renderer';
import { OFFERS } from '../../test/__mocks__/offers';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';
import { Room } from './room.jsx';

const mockStore = configureStore([]);
const offerInfo = OFFERS[0];

describe(`Room component snapshot test`, () => {
  it(`Should render room offer page`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        offers: [],
      },
      [NameSpace.STATE]: {
        city: '',
      },
      [NameSpace.USER]: {
        authStatus: 'NO_AUTH',
        userEmail: '',
        userFavorites: [],
      },
    });

    const tree = renderer
      .create(
        <Provider store={store}>
          <Room offerInfo={offerInfo} offerId={1} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
