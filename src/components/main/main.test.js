import React from 'react';
import renderer from 'react-test-renderer';
import { Router } from 'react-router-dom';
import history from '../../history.js';
import { Main } from './main.jsx';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';
import { OFFERS } from '../../test/__mocks__/offers.js';

const mockStore = configureStore([]);

const offersDataArray = OFFERS;

const city = 'Amsterdam';

describe(`Main component snapshot test`, () => {
  it(`Main component should render main page
      with number of awaliable places = 11,
      and places infos`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        offers: offersDataArray,
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
          <Router history={history}>
            <Main
              handleCityChange={() => {}}
              offersDataArray={offersDataArray}
              authStatus=""
              userEmail=""
            />
          </Router>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
