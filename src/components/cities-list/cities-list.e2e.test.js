import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CitiesList } from './cities-list.jsx';

const uniqueCities = [
  'Amsterdam',
  'Paris',
  'Cologne',
  'Dusseldorf',
  'Brusseles',
  'Hamburg',
];
const currentCity = 'Amsterdam';

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`CitiesList component e2e test`, () => {
  it(`Should all headers be pressed`, () => {
    const onHeaderClick = jest.fn();

    const citiesListComponent = shallow(
      <CitiesList
        currentCity={currentCity}
        uniqueCities={uniqueCities}
        onActiveItemChange={onHeaderClick}
      />,
    );

    const headers = citiesListComponent.find(`a.locations__item-link`);

    headers.forEach((header) => {
      header.simulate(`click`, { preventDefault() {} });
    });

    expect(onHeaderClick).toHaveBeenCalledTimes(6);
  });
});
