import * as React from 'react';
import { Router, Switch, Route, RouteComponentProps } from 'react-router-dom';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Room from '../room/room';
import { AppRoutes } from '../../const';
import history from '../../history';

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route
          path={AppRoutes.ROOT}
          exact
          render={(): React.ReactNode => {
            return <Main />;
          }}
        />
        <Route
          path={AppRoutes.LOGIN}
          exact
          render={(): React.ReactNode => {
            return <SignIn />;
          }}
        />
        <Route
          path={AppRoutes.ROOM}
          exact
          render={(): React.ReactNode => {
            return <Room />;
          }}
        />
      </Switch>
    </Router>
  );
  {
    /* TODO: Добаввить роут для 404 путей */
  }
};

export default App;
