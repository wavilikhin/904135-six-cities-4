import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card.jsx';

const cardData = {
  quality: `Premium`,
  image: `img/apartment-01.jpg`,
  priceValue: `&euro;160`,
  priceText: `&#47;&nbsp;night`,
  name: `Beautiful apartment near the city center`,
  type: `Apartment`,
};

describe(`ContentCard component test`, () => {
  it(`Should render content card with quality=Premium,
        price=&euro;160/night, name=Beautiful apartment near the city center
        and type=Apartment`, () => {
    const tree = renderer
      .create(<OfferCard handleHover={() => {}} cardData={cardData} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
