import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OfferCard from './offer-card.jsx';

const cardData = {
  quality: `Premium`,
  image: `img/apartment-04.jpg`,
  priceValue: `&euro;80`,
  priceText: `&#47;&nbsp;night`,
  name: `Nice, cozy, warm big bed apartment`,
  type: `Apartment`,
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
    expect(onHover.mock.results[1].value).toBe('');

    expect(onHover).toHaveBeenCalledTimes(2);
  });
});
