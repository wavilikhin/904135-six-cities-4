import * as React from 'react';
import renderer from 'react-test-renderer';
import { CitiesList } from './cities-list.js';

const uniqueCities = [
  'Amsterdam',
  'Dusseldorf',
  'Hamburg',
  'Paris',
  'Brusseles',
  'Cologne',
];
const city = 'Amsterdam';

describe(`CitiesList component snapshot test`, () => {
  it(`Should render cities list with 6 cities`, () => {
    const tree = renderer
      .create(
        <CitiesList
          uniqueCities={uniqueCities}
          currentCity={city}
          onActiveItemChange={() => {}}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
