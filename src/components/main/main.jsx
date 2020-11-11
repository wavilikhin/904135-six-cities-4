import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CitiesList from '../cities-list/cities-list.jsx';
import Offers from '../offers/offers.jsx';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ActionCreator } from '../../reducer/state/state.js';
import { getOffers } from '../../reducer/data/selectors.js';
import { getAuthStatus, getUserEmail } from '../../reducer/user/selectors.js';
import { AppRoutes } from '../../const.js';

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this._updateCurrentCity = this._updateCurrentCity.bind(this);
  }

  _updateCurrentCity() {
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
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img
                    className="header__logo"
                    src="img/logo.svg"
                    alt="6 cities logo"
                    width="81"
                    height="41"
                  />
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link
                      to={
                        authStatus === 'NO_AUTH'
                          ? AppRoutes.LOGIN
                          : AppRoutes.FAVORITES
                      }
                    >
                      <span>
                        {authStatus === 'NO_AUTH' ? `Sign In` : userEmail}
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

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

Main.propTypes = {
  offersDataArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      cityCoords: PropTypes.arrayOf(PropTypes.number, PropTypes.number),
      isPremium: PropTypes.bool.isRequired,
      image: PropTypes.string.isRequired,
      priceValue: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      coords: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
    }),
  ).isRequired,
  handleCityChange: PropTypes.func,
  authStatus: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  offersDataArray: getOffers(state),
  authStatus: getAuthStatus(state),
  userEmail: getUserEmail(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleCityChange(city) {
    dispatch(ActionCreator.changeCiy(city));
  },
});

export { Main };
export default connect(mapStateToProps, mapDispatchToProps)(Main);
