import React from 'react';
import renderer from 'react-test-renderer';
import { OFFERS } from '../../test/__mocks__/offers.js';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';
import { SignIn } from './sign-in.jsx';

const mockStore = configureStore([]);

describe(`SignIn component snapshot test`, () => {
  it(`Should render "sign in" page`, () => {
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
          <SignIn onSubmit={() => {}} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
