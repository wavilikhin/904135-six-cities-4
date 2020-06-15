import React from 'react';
import ReactDOM from 'react-dom';

import Main from './Main.jsx';

const App =  ({numberOfAvaliablePlaces, placesInfo}) =>{
  return <Main 
    numberOfAvaliablePlaces = {numberOfAvaliablePlaces}
    placesInfo = {placesInfo}
  />
}

export default App