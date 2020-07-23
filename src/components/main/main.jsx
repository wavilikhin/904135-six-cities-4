import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes, { object } from 'prop-types';
import CitiesList from '../cities-list/cities-list.jsx';
import Offers from '../offers/offers.jsx';
import { connect } from 'react-redux';
import { ActionCreator } from '../../reducer.js';

class Main extends PureComponent {
  componentDidMount() {
    const { handleCityChange, offersDataArray } = this.props;
    handleCityChange(offersDataArray[0].city);
  }

  render() {
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
                    <a
                      className="header__nav-link header__nav-link--profile"
                      href="#"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        Oliver.conner@gmail.com
                      </span>
                    </a>
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
      city: PropTypes.string.isRequired,
      cityCoords: PropTypes.arrayOf(PropTypes.number, PropTypes.number),
      quality: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      priceValue: PropTypes.string.isRequired,
      priceText: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      coords: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
    }),
  ).isRequired,
  handleCityChange: PropTypes.func,
};

const mapStateToProps = (state) => ({
  offersDataArray: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  handleCityChange(city) {
    dispatch(ActionCreator.changeCiy(city));
  },
});

export { Main };
export default connect(mapStateToProps, mapDispatchToProps)(Main);
