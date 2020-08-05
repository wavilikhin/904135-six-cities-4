import React from 'react';
import renderer from 'react-test-renderer';
import withActiveItem from './with-active-item.jsx';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

const mockData = {
  activeItem: 'Amsterdam',
  onActiveItemChange: () => {},
};

const MockComponent = (props) => {
  const { children } = props;

  return <div>{children}</div>;
};

const MockComponentWrapped = withActiveItem(MockComponent, {
  stateUpdateRequired: false,
});

it(`withActiveItem is rendered correctly`, () => {
  const store = mockStore({
    [NameSpace.STATE]: {
      city: 'Amsterdam',
    },
    [NameSpace.DATA]: {
      offers: [
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
        {
          city: 'Paris',

          cityCoords: [48.856979, 2.347253],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-01.jpg`,
          priceValue: 120,
          name: `Beautiful & luxurious apartment at great location`,
          type: `Apartment`,
          coords: [48.850947, 2.309637],
        },
        {
          city: 'Paris',

          cityCoords: [48.856979, 2.347253],
          isPremium: true,
          cityZoom: 12,
          image: `img/room.jpg`,
          priceValue: 110,
          name: `Just a nice place`,
          type: `Room`,
          coords: [48.884736, 2.308444],
        },
        {
          city: 'Paris',

          cityCoords: [48.856979, 2.347253],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-02.jpg`,
          priceValue: 100,
          name: `Wood and stone place`,
          type: `Apartment`,
          coords: [48.86922, 2.354299],
        },
        {
          city: 'Paris',

          cityCoords: [48.856979, 2.347253],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-03.jpg`,
          priceValue: 150,
          name: `Canal View Prinsengracht`,
          type: `Apartment`,
          coords: [48.865762, 2.373757],
        },
        {
          city: 'Paris',

          cityCoords: [48.856979, 2.347253],
          isPremium: true,
          cityZoom: 12,
          image: `img/room.jpg`,
          priceValue: 80,
          name: `Nice, cozy, warm big bed apartment`,
          type: `Room`,
          coords: [48.842058, 2.349616],
        },
        {
          city: 'Paris',

          cityCoords: [48.856979, 2.347253],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-03.jpg`,
          priceValue: 150,
          name: `Place to stay with family`,
          type: `Apartment`,
          coords: [48.842085, 2.320558],
        },
        {
          city: 'Paris',

          cityCoords: [48.856979, 2.347253],
          isPremium: true,
          cityZoom: 12,
          image: `img/room.jpg`,
          priceValue: 80,
          name: `Best view in Paris`,
          type: `Room`,
          coords: [48.857679, 2.32476],
        },
        {
          city: 'Cologne',

          cityCoords: [50.936427, 6.966603],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-01.jpg`,
          priceValue: 120,
          name: `Beautiful & luxurious apartment at great location`,
          type: `Apartment`,
          coords: [50.97625, 6.934587],
        },
        {
          city: 'Cologne',

          cityCoords: [50.936427, 6.966603],
          isPremium: true,
          cityZoom: 12,
          image: `img/room.jpg`,
          priceValue: 110,
          name: `Just a nice place`,
          type: `Room`,
          coords: [50.916127, 7.007951],
        },
        {
          city: 'Cologne',

          cityCoords: [50.936427, 6.966603],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-02.jpg`,
          priceValue: 100,
          name: `Wood and stone place`,
          type: `Apartment`,
          coords: [50.928995, 7.003401],
        },
        {
          city: 'Cologne',
          cityCoords: [50.936427, 6.966603],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-03.jpg`,
          priceValue: 150,
          name: `Canal View Prinsengracht`,
          type: `Apartment`,
          coords: [50.938374, 6.973216],
        },
        {
          city: 'Cologne',
          cityCoords: [50.936427, 6.966603],
          isPremium: true,
          cityZoom: 12,
          image: `img/room.jpg`,
          priceValue: 80,
          name: `Nice, cozy, warm big bed apartment`,
          type: `Room`,
          coords: [50.937424, 6.95898],
        },
        {
          city: 'Cologne',
          cityCoords: [50.936427, 6.966603],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-03.jpg`,
          priceValue: 150,
          name: `Place to stay with family`,
          type: `Apartment`,
          coords: [50.94009, 6.94492],
        },
        {
          city: 'Brusseles',
          cityCoords: [50.873122, 4.359721],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-01.jpg`,
          priceValue: 120,
          name: `Beautiful & luxurious apartment at great location`,
          type: `Apartment`,
          coords: [50.875505, 4.357804],
        },
        {
          city: 'Brusseles',
          cityCoords: [50.873122, 4.359721],
          isPremium: true,
          cityZoom: 12,
          image: `img/room.jpg`,
          priceValue: 110,
          name: `Just a nice place`,
          type: `Room`,
          coords: [50.874767, 4.348062],
        },
        {
          city: 'Brusseles',
          cityCoords: [50.873122, 4.359721],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-02.jpg`,
          priceValue: 100,
          name: `Wood and stone place`,
          type: `Apartment`,
          coords: [50.874883, 4.333563],
        },
        {
          city: 'Brusseles',
          cityCoords: [50.873122, 4.359721],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-03.jpg`,
          priceValue: 150,
          name: `Canal View Prinsengracht`,
          type: `Apartment`,
          coords: [50.876137, 4.359958],
        },
        {
          city: 'Brusseles',
          cityCoords: [50.873122, 4.359721],
          isPremium: true,
          cityZoom: 12,
          image: `img/room.jpg`,
          priceValue: 80,
          name: `Nice, cozy, warm big bed apartment`,
          type: `Room`,
          coords: [50.871112, 4.353733],
        },
        {
          city: 'Brusseles',
          cityCoords: [50.873122, 4.359721],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-03.jpg`,
          priceValue: 150,
          name: `Place to stay with family`,
          type: `Apartment`,
          coords: [50.868288, 4.359221],
        },
        {
          city: 'Hamburg',
          cityCoords: [53.541761, 10.005761],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-01.jpg`,
          priceValue: 120,
          name: `Beautiful & luxurious apartment at great location`,
          type: `Apartment`,
          coords: [53.572457, 9.988757],
        },
        {
          city: 'Hamburg',
          cityCoords: [53.541761, 10.005761],
          isPremium: true,
          cityZoom: 12,
          image: `img/room.jpg`,
          priceValue: 110,
          name: `Just a nice place`,
          type: `Room`,
          coords: [53.573362, 9.978636],
        },
        {
          city: 'Hamburg',
          cityCoords: [53.541761, 10.005761],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-02.jpg`,
          priceValue: 100,
          name: `Wood and stone place`,
          type: `Apartment`,
          coords: [53.574422, 9.992684],
        },
        {
          city: 'Hamburg',
          cityCoords: [53.541761, 10.005761],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-03.jpg`,
          priceValue: 150,
          name: `Canal View Prinsengracht`,
          type: `Apartment`,
          coords: [53.57671, 9.999804],
        },
        {
          city: 'Hamburg',
          cityCoords: [53.541761, 10.005761],
          isPremium: true,
          cityZoom: 12,
          image: `img/room.jpg`,
          priceValue: 80,
          name: `Nice, cozy, warm big bed apartment`,
          type: `Room`,
          coords: [53.583353, 9.988737],
        },
        {
          city: 'Hamburg',
          cityCoords: [53.541761, 10.005761],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-03.jpg`,
          priceValue: 150,
          name: `Place to stay with family`,
          type: `Apartment`,
          coords: [53.58557, 9.981546],
        },
        {
          city: 'Dusseldorf',
          cityCoords: [51.2415, 6.786019],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-01.jpg`,
          priceValue: 120,
          name: `Beautiful & luxurious apartment at great location`,
          type: `Apartment`,
          coords: [51.22614, 6.831664],
        },
        {
          city: 'Dusseldorf',
          cityCoords: [51.2415, 6.786019],
          isPremium: true,
          cityZoom: 12,
          image: `img/room.jpg`,
          priceValue: 110,
          name: `Just a nice place`,
          type: `Room`,
          coords: [51.230239, 6.823853],
        },
        {
          city: 'Dusseldorf',
          cityCoords: [51.2415, 6.786019],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-02.jpg`,
          priceValue: 100,
          name: `Wood and stone place`,
          type: `Apartment`,
          coords: [51.232027, 6.814242],
        },
        {
          city: 'Dusseldorf',
          cityCoords: [51.2415, 6.786019],
          isPremium: true,
          cityZoom: 12,
          image: `img/apartment-03.jpg`,
          priceValue: 150,
          name: `Canal View Prinsengracht`,
          type: `Apartment`,
          coords: [51.233397, 6.802376],
        },
      ],
    },
  });
  const tree = renderer
    .create(
      <Provider store={store}>
        <MockComponentWrapped
          activeItem={mockData.activeItem}
          onActiveItemChange={mockData.onActiveItemChange}
        />
      </Provider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
