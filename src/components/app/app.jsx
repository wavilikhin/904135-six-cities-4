import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getAuthStatus } from "../../reducer/user/selectors.js";

import Main from "../main/main.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import { AppRoutes } from "../../const.js";
import history from "../../history.js";

const App = (props) => {
  const { authStatus } = props;
  console.log("App -> authStatus", authStatus);

  return (
    <Router history={history}>
      <Switch>
        <Route
          path={AppRoutes.ROOT}
          exact
          render={() => {
            return <Main />;
          }}
        />
        <Route
          path={AppRoutes.LOGIN}
          exact
          render={() => {
            return <SignIn />;
          }}
        />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
});

export { App };
export default connect(mapStateToProps, null)(App);
