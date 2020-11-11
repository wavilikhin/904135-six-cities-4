import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducer/reducer.js";
import { Operation as DataOperation } from "./reducer/data/data.js";
import {
  Operation as UserOperation,
  ActionCreator,
} from "./reducer/user/user.js";
import { createApi } from "./api.js";
import App from "./components/app/app.jsx";
import { AuthStatus, AppRoutes } from "./const.js";
import history from "./history.js";

const onUnauthorized = () => {
<<<<<<< HEAD
  console.warn("You are currently unauthorized, user set to default");
  // FIXME: Переделать со своим серваком авторизации
  // store.dispatch(ActionCreator.updateAuthStatus(AuthStatus.NO_AUTH));
=======
  store.dispatch(ActionCreator.updateAuthStatus(AuthStatus.NO_AUTH));
>>>>>>> 829d14386c095516e992fec2eaf3170306bb8d4c
  // history.push(AppRoutes.LOGIN);
};

const api = createApi(onUnauthorized);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(DataOperation.updateOffers());
<<<<<<< HEAD
// FIXME: Переделать со своим серваком авторизации
// store.dispatch(UserOperation.updateAuthStatus());
=======
store.dispatch(UserOperation.updateAuthStatus());
store.dispatch(UserOperation.getFavorites());
>>>>>>> 829d14386c095516e992fec2eaf3170306bb8d4c

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById(`root`)
);
