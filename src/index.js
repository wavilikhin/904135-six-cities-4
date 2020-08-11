import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer/reducer.js';
import { Operation as DataOperation } from './reducer/data/data.js';
import {
  Operation as UserOperation,
  ActionCreator,
} from './reducer/user/user.js';
import { createApi } from './api.js';
import App from './components/app/app.jsx';
import { AuthStatus, AppRoutes } from './const.js';
import history from './history.js';

const onUnauthorized = () => {
  store.dispatch(ActionCreator.updateAuthStatus(AuthStatus.NO_AUTH));
  history.push(AppRoutes.LOGIN);
};

const api = createApi(onUnauthorized);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))),
);

store.dispatch(DataOperation.updateOffers());
store.dispatch(UserOperation.updateAuthStatus());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById(`root`),
);
