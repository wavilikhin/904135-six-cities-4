import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';

const data = {
  numberOfAvaliablePlaces: `312`
};

ReactDOM.render(
    <App
      numberOfAvaliablePlaces = {data.numberOfAvaliablePlaces}
    />,
    document.getElementById(`root`)
);
