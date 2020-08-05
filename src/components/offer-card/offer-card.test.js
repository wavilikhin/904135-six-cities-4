import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card.jsx';

const cardData = {
  isPremium: true,
  cityZoom: 12,
  image: `img/apartment-01.jpg`,
  priceValue: 160,
  name: `Beautiful apartment near the city center`,
  type: `Apartment`,
  coords: [52.3809553943508, 49.39309666406198],
};

describe(`ContentCard component snapshot test`, () => {
  it(`Should render content card with quality=Premium,
        price=&euro;160/night, name=Beautiful apartment near the city center
        and type=Apartment`, () => {
    const tree = renderer
      .create(<OfferCard handleHover={() => {}} cardData={cardData} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
