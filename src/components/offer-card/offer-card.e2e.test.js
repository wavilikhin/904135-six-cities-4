import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OfferCard from './offer-card.jsx';
import { OFFERS } from '../../test/__mocks__/offers.js';

const cardData = OFFERS[0];
const userFavorites = [];

configure({
  adapter: new Adapter(),
});

describe(`OfferCard component test`, () => {
  it(`Should onHover be called twice`, () => {
    const onHover = jest.fn((val) => {
      return val;
    });

    const offerCard = shallow(
      <OfferCard
        handleHover={onHover}
        cardData={cardData}
        handleFavoritesUpdate={() => {}}
        userFavorites={userFavorites}
      />,
    );

    offerCard.simulate('mouseEnter');
    offerCard.simulate('mouseLeave');

    expect(onHover.mock.results[0].value).toBe(cardData);
    expect(onHover.mock.results[1].value).toBe(null);

    expect(onHover).toHaveBeenCalledTimes(2);
  });
});
