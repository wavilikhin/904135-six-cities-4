// main
import * as React from 'react';
import renderer from 'react-test-renderer';
// components
import { withMap } from './with-map.jsx';
// data
import { OFFERS } from '../../test/__mocks__/offers.js';
const mockData = OFFERS;

const MockComponent = () => {
  return <div style={{ height: `100vh` }} id="map"></div>;
};

const MockComponentWrapped = withMap(MockComponent);

it(`WithMap snapthot test`, () => {
  const tree = renderer
    .create(<MockComponentWrapped offers={mockData} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
