import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const offersDataArray = [
  {
    quality: `Premium`,
    image: `img/apartment-01.jpg`,
    priceValue: `\u20AC120`,
    priceText: ` \u2215\u0020night`,
    name: `Beautiful & luxurious apartment at great location`,
    type: `Apartment`,
  },
  {
    quality: `Premium`,
    image: `img/room.jpg`,
    priceValue: `\u20AC110`,
    priceText: ` \u2215\u0020night`,
    name: `Just a nice place`,
    type: `Room`,
  },
  {
    quality: `Premium`,
    image: `img/apartment-02.jpg`,
    priceValue: `\u20AC100`,
    priceText: ` \u2215\u0020night`,
    name: `Wood and stone place`,
    type: `Apartment`,
  },
  {
    quality: `Premium`,
    image: `img/apartment-03.jpg`,
    priceValue: `\u20AC150`,
    priceText: ` \u2215\u0020night`,
    name: `Canal View Prinsengracht`,
    type: `Apartment`,
  },
  {
    quality: `Premium`,
    image: `img/room.jpg`,
    priceValue: `\u20AC80`,
    priceText: ` \u2215\u0020night`,
    name: `Nice, cozy, warm big bed apartment`,
    type: `Room`,
  },
];

describe(`App component test`, () => {
  it(`App component should render main page
    with number of awaliable places = 1337,
    and places infos: [one, two, three, four]`, () => {
    const tree = renderer
      .create(<App offersDataArray={offersDataArray} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
