import React from 'react';
import renderer from 'react-test-renderer';
import OffersList from './offers-list.jsx';

const offersDataArray = [
  {
    quality: `Premium`,
    image: `img/apartment-01.jpg`,
    priceValue: `&euro;150`,
    priceText: `&#47;&nbsp;night`,
    name: `Awesome place to stay with kids`,
    type: `Apartment`,
  },
  {
    quality: `Luxury`,
    image: `img/apartment-02.jpg`,
    priceValue: `&euro;100`,
    priceText: `&#47;&nbsp;night`,
    name: `A place with a magnificent landscape`,
    type: `Apartment`,
  },
  {
    quality: `Premium`,
    image: `img/apartment-03.jpg`,
    priceValue: `&euro;150`,
    priceText: `&#47;&nbsp;night`,
    name: `A place near river`,
    type: `Apartment`,
  },
  {
    quality: `Premium`,
    image: `img/apartment-04.jpg`,
    priceValue: `&euro;80`,
    priceText: `&#47;&nbsp;night`,
    name: `Cozy place with fire-place`,
    type: `Apartment`,
  },
  {
    quality: `Premium`,
    image: `img/apartment-05.jpg`,
    priceValue: `&euro;110`,
    priceText: `&#47;&nbsp;night`,
    name: `Just a nice place`,
    type: `Apartment`,
  },
];

describe('OffersList component snapshot test', () => {
  it(`Should render a list of 5 offers with data and images`, () => {
    const tree = renderer
      .create(
        <OffersList handleHover={() => {}} offersDataArray={offersDataArray} />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
