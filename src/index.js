import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer/reducer.js';
import { Operation as DataOperation } from './reducer/data/data.js';
import { createApi } from './api.js';
import App from './components/app/app.jsx';

const onUnauthorized = () => {
  store.dispatch(
    ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH),
  );
};

const api = createApi(onUnauthorized);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))),
);

store.dispatch(DataOperation.updateOffers());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById(`root`),
);
