import * as React from 'react';
import renderer from 'react-test-renderer';
import { App } from './app.jsx';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

describe(`App component snapshot test`, () => {
  it(`App component should render "main" page with link to "favorites"`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        offers: [],
      },
      [NameSpace.STATE]: {
        city: '',
      },
      [NameSpace.USER]: {
        authStatus: 'AUTH',
        userEmail: '',
        userFavorites: [],
      },
    });
    const tree = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`App component should render "main" page  with link to "sign in"`, () => {
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
          <App />
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
