import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Router } from 'react-router-dom';
import history from '../../history.js';
import { Main } from './main.jsx';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';
import { OFFERS } from '../../test/__mocks__/offers.js';

const mockStore = configureStore([]);

const offersDataArray = OFFERS;

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Main component's end-to-end test`, () => {
  it(`handleCityChange should be called once`, () => {
    const onHeaderClick = jest.fn();

    const store = mockStore({
      [NameSpace.DATA]: {
        offers: offersDataArray,
      },
      [NameSpace.STATE]: {
        city: 'Amsterdam',
      },
      [NameSpace.USER]: {
        userFavorites: [],
      },
    });

    const mainComponent = mount(
      <Provider store={store}>
        <Router history={history}>
          <Main
            handleCityChange={onHeaderClick}
            offersDataArray={offersDataArray}
            authStatus=""
            userEmail=""
          />
        </Router>
      </Provider>,
    );

    mainComponent.setProps({
      offersDataArray: [
        {
          city: 'Amsterdam',
          cityCoords: [52.38333, 4.9],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-01.jpg`,
          priceValue: 120,
          name: `Beautiful & luxurious apartment at great location`,
          type: `Apartment`,
          coords: [52.3909553943508, 4.85309666406198],
        },
        {
          city: 'Amsterdam',

          cityCoords: [52.38333, 4.9],
          isPremium: true,
          cityZoom: 12,
          image: `img/room.jpg`,
          priceValue: 110,
          name: `Just a nice place`,
          type: `Room`,
          coords: [52.369553943508, 4.85309666406198],
        },
      ],
      handleCityChange: onHeaderClick,
    });
    expect(onHeaderClick).toHaveBeenCalledTimes(1);
  });
});
