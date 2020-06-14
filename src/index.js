import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';

const data = {
  numberOfAvaliablePlaces: `312`,
  placesInfo: [`Beautiful &amp; luxurious apartment at great location`, `Wood and stone place`, `Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`, `Wood and stone place`]
};

ReactDOM.render(
    <App
      numberOfAvaliablePlaces = {data.numberOfAvaliablePlaces}
      placesInfo = {data.placesInfo}
    />,
    document.getElementById(`root`)
);
