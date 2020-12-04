import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Main from "../main/main";
import SignIn from "../sign-in/sign-in";
import Room from "../room/room";
import { AppRoutes } from "../../const";
import history from "../../history";

const App: React.FC = () => {
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
        <Route
          path={AppRoutes.ROOM}
          exact
          render={(props) => {
            return <Room offerId={props.match.params.id} />;
          }}
        />
      </Switch>
    </Router>
  );
};

export default App;
