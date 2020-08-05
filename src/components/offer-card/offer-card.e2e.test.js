import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OfferCard from './offer-card.jsx';

const cardData = {
  city: 'Amsterdam',
  cityCoords: [52.38333, 4.9],
  isPremium: true,
  cityZoom: 12,
  image: `img/apartment-01.jpg`,
  priceValue: `\u20AC120`,
  priceText: ` \u2215\u0020night`,
  name: `Beautiful & luxurious apartment at great location`,
  type: `Apartment`,
  coords: [52.3909553943508, 4.85309666406198],
};

configure({
  adapter: new Adapter(),
});

describe(`OfferCard component test`, () => {
  it(`Should onHover be called twice`, () => {
    const onHover = jest.fn((val) => {
      return val;
    });

    const offerCard = shallow(
      <OfferCard handleHover={onHover} cardData={cardData} />,
    );

    offerCard.simulate('mouseEnter');
    offerCard.simulate('mouseLeave');

    expect(onHover.mock.results[0].value).toBe(cardData);
    expect(onHover.mock.results[1].value).toBe(null);

    expect(onHover).toHaveBeenCalledTimes(2);
  });
});
