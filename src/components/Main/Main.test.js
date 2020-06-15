import React from 'react';
import renderer from 'react-test-renderer';
import Main from './Main.jsx';

const placesAvaliable = 1488;
const placesInfo = [`firstInfo`, `secondInfo`, `thirdInfo`, `fourthInfo`];

describe(`Main component test`, () => {
  it(
      `Main component should render main page
    with number of awaliable places = 1488,
    and places infos: [firstInfo, secondInfo, thirdInfo, fourthInfo]`,
      () => {
        const tree = renderer
        .create(
            <Main
              numberOfAvaliablePlaces={placesAvaliable}
              placesInfo={placesInfo}
            />
        )
        .toJSON();

        expect(tree).toMatchSnapshot();
      }
  );
});
