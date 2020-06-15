import React from 'react';
import ReactDOM from 'react-dom';

import Main from './Main.jsx';

const App =  ({numberOfAvaliablePlaces}) =>{
  return <Main 
    numberOfAvaliablePlaces = {numberOfAvaliablePlaces}
  />
}

export default App