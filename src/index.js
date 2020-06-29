import React from 'react';
import ReactDOM from 'react-dom';
import offersDataArray from './__mocks__/offers.js';

import App from './components/app/app.jsx';

ReactDOM.render(
  <App offersDataArray={offersDataArray} />,
  document.getElementById(`root`),
);
