import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import NameSpace from '../../reducer/name-space.js';
import withAddFavorites from './with-add-favorites.jsx';

const MockComponent = () => {
  return <div></div>;
};
const mockStore = configureStore([]);

const MockComponentWrapped = withAddFavorites(MockComponent);

const userFavorites = [];
const offersArray = [];
const handleFavoritesChange = () => {};

describe(`WithAddFavorites component snapshot test`, () => {
  it(`Should render wrapped component well`, () => {
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
          <MockComponentWrapped
            userFavorites={userFavorites}
            offersArray={offersArray}
            handleFavoritesChange={handleFavoritesChange}
          />
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
