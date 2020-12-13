import * as React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Header from '../header/header';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Room from '../room/room';
import Favorites from '../favorites/favorites';
import { withAddFavorites } from '../../hocs/with-add-favorites/with-add-favorites';
import { AppRoutes } from '../../const';
import history from '../../history';

const RoomWrapped = withAddFavorites(Room);

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Header />
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
          render={(props): React.ReactNode => {
            return <RoomWrapped offerId={Number(props.match.params.id)} />;
          }}
        />
        <Route
          path={AppRoutes.FAVORITES}
          exact
          render={(): React.ReactNode => {
            return <Favorites />;
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
