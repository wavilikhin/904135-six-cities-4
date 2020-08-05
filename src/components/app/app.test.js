import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

describe(`App component test`, () => {
  it(`App component should render main page`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        offers: [],
      },
      [NameSpace.STATE]: {
        city: '',
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
