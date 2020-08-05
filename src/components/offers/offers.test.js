import React from 'react';
import renderer from 'react-test-renderer';
import { Offers } from './offers.jsx';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

const filtredOffers = [
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
  {
    city: 'Amsterdam',

    cityCoords: [52.38333, 4.9],
    isPremium: true,
    cityZoom: 12,
    image: `img/apartment-02.jpg`,
    priceValue: 100,
    name: `Wood and stone place`,
    type: `Apartment`,
    coords: [52.3909553943508, 4.929309666406198],
  },
  {
    city: 'Amsterdam',

    cityCoords: [52.38333, 4.9],
    isPremium: true,
    cityZoom: 12,
    image: `img/apartment-03.jpg`,
    priceValue: 150,
    name: `Canal View Prinsengracht`,
    type: `Apartment`,
    coords: [52.3809553943508, 4.939309666406198],
  },
  {
    city: 'Amsterdam',

    cityCoords: [52.38333, 4.9],
    isPremium: true,
    cityZoom: 12,
    image: `img/room.jpg`,
    priceValue: 80,
    name: `Nice, cozy, warm big bed apartment`,
    type: `Room`,
    coords: [52.3709553943508, 4.89309666406198],
  },
];

const city = 'Amsterdam';

it(`Should render offers component with offers cards and map`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      offers: filtredOffers,
    },
    [NameSpace.STATE]: {
      city: city,
    },
  });

  const tree = renderer
    .create(
      <Provider store={store}>
        <Offers filtredOffers={filtredOffers} city={city} />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
