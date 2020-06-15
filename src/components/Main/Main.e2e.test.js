import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './Main.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

describe(`Main component's header click test`, () => {
  it(`Should all headers be pressed`, () => {
    const onHeaderClick = jest.fn();

    const mainComponent = shallow(
        <Main
          numberOfAvaliablePlaces = {213}
          placesInfo = {[`one`, `two`, `three`, `four`]}
          onHeaderClick = {onHeaderClick}
        />
    );

    const headers = mainComponent.find(`a.locations__item-link`);

    headers.forEach((header) => {
      header.simulate(`click`, {preventDefault() {}});
    });

    expect(onHeaderClick).toHaveBeenCalledTimes(6);
  });
});
