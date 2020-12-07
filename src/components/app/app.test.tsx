import * as React from 'react';
import renderer from 'react-test-renderer';
import App from './app';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { testStore } from '../../test/__mocks__/store';

const mockStore = configureStore([]);
const store = mockStore(testStore);

describe(`App component snapshot test`, () => {
  it(`App component should render "main" page`, () => {
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
