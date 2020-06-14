import React from 'react';
import renderer from 'react-test-renderer';
import App from './App.jsx';

const placesAvaliable = 1337;
const placesInfo = [`one`, `two`, `three`, `four`];

describe(`App component test`, ()=> {
  it(
      `App component should render main page
    with number of awaliable places = 1337,
    and places infos: [one, two, three, four]`,
      ()=> {
        const tree = renderer
        .create(
            <App
              numberOfAvaliablePlaces={placesAvaliable}
              placesInfo={placesInfo}
            />
        )
        .toJSON();

        expect(tree).toMatchSnapshot();
      });
});
