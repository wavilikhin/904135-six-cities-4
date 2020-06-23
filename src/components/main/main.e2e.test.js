import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

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

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Main component's end-to-end test`, () => {
  it(`Should all headers be pressed`, () => {
    const onHeaderClick = jest.fn();

    const mainComponent = shallow(
      <Main onHeaderClick={onHeaderClick} offersDataArray={offersDataArray} />,
    );

    const headers = mainComponent.find(`a.locations__item-link`);

    headers.forEach((header) => {
      header.simulate(`click`, { preventDefault() {} });
    });

    expect(onHeaderClick).toHaveBeenCalledTimes(6);
  });
});
