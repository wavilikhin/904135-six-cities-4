import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';
import { OFFERS } from '../../test/__mocks__/offers.js';

const offers = OFFERS;

describe('Map component snapshot test', () => {
  it(`Should render map`, () => {
    const tree = renderer.create(<Map offers={offers} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
