import React from 'react';
import renderer from 'react-test-renderer';
import { CitiesList } from './cities-list.jsx';

const uniqueCities = [
  'Amsterdam',
  'Dusseldorf',
  'Hamburg',
  'Paris',
  'Brusseles',
  'Cologne',
];
const city = 'Amsterdam';

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
