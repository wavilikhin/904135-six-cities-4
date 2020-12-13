import * as React from 'react';

import CitiesList from '../cities-list/cities-list';
import Offers from '../offers/offers';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ActionCreator } from '../../reducer/state/state';
import { getOffers } from '../../reducer/data/selectors';
import { getAuthStatus, getUserEmail } from '../../reducer/user/selectors';
import { AppRoutes } from '../../const';
import { OfferInfo } from '../../types';
import { AppStateType } from '../../reducer/reducer';
import { AuthStatus } from '../../reducer/user/user';
import { Dispatch } from 'redux';
import { AppActionCreator } from '../../reducer/types';

type StateToPropsTypes = {
  offersDataArray: OfferInfo[];
  authStatus: AuthStatus;
  userEmail: string;
};

type DispathcToPropsTypes = {
  handleCityChange: (city: string) => void;
};

type Props = StateToPropsTypes & DispathcToPropsTypes;

class Main extends React.PureComponent<Props> {
  props: Props;

  constructor(props: Props) {
    super(props);

    this._updateCurrentCity = this._updateCurrentCity.bind(this);
  }

  _updateCurrentCity(): void {
    const { handleCityChange, offersDataArray } = this.props;
    if (offersDataArray.length > 0) {
      handleCityChange(offersDataArray[0].city);
    }
  }

  componentDidMount() {
    this._updateCurrentCity();
  }
  componentDidUpdate() {
    this._updateCurrentCity();
  }

  render() {
    const { authStatus, userEmail } = this.props;

    return (
      <div className="page page--gray page--main">
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <CitiesList />
          </div>
          <Offers />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  offersDataArray: getOffers(state),
  authStatus: getAuthStatus(state),
  userEmail: getUserEmail(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppActionCreator>) => ({
  handleCityChange(city: string) {
    dispatch(ActionCreator.changeCiy(city));
  },
});

export { Main };
export default connect<
  StateToPropsTypes,
  DispathcToPropsTypes,
  {},
  AppStateType
>(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
