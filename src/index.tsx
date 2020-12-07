import * as React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, Store, CombinedState } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer, RootReducer } from './reducer/reducer';
import { Operation as DataOperation } from './reducer/data/data';
import { Operation as UserOperation, ActionCreator } from './reducer/user/user';
import { createApi } from './api';
import App from './components/app/app';
import { AuthStatus, AppRoutes } from './const';
import history from './history';
import { AxiosInstance } from 'axios';

const onUnauthorized = (): void => {
  store.dispatch(ActionCreator.updateAuthStatus(AuthStatus.NO_AUTH));
  history.push(AppRoutes.LOGIN);
};

const api: AxiosInstance = createApi(onUnauthorized);

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))),
);

// TODO: Посмотреть createAction   https://github.com/piotrwitek/typesafe-actions#1-basic-actions
store.dispatch(UserOperation.updateAuthStatus());
store.dispatch(DataOperation.updateOffers());
store.dispatch(UserOperation.getFavorites());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById(`root`),
);
