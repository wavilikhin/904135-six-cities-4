import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CitiesList from '../cities-list/cities-list.jsx';
import OffersList from '../offers-list/offers-list.jsx';

import Map from '../map/map.jsx';
import { connect } from 'react-redux';
import { ActionCreator } from '../../reducer.js';

class Main extends PureComponent {
  componentDidMount() {
    const { onHeaderClick, offersDataArray } = this.props;
    onHeaderClick(offersDataArray[0].city);
  }

  render() {
    const { onHeaderClick, offersDataArray, city } = this.props;

    const filtredOffers = offersDataArray.filter((offer) => {
      return offer.city === city;
    });

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
            <CitiesList
              onHeaderClick={onHeaderClick}
              offers={offersDataArray}
              currentCity={city}
            />
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {filtredOffers.length} places to stay in {city}
                </b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex="0">
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li
                      className="places__option places__option--active"
                      tabIndex="0"
                    >
                      Popular
                    </li>
                    <li className="places__option" tabIndex="0">
                      Price: low to high
                    </li>
                    <li className="places__option" tabIndex="0">
                      Price: high to low
                    </li>
                    <li className="places__option" tabIndex="0">
                      Top rated first
                    </li>
                  </ul>
                </form>
                <OffersList offersDataArray={filtredOffers} />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map city={city} zoom={12} offers={filtredOffers} />
                </section>
              </div>
            </div>
          </div>
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
  onHeaderClick: PropTypes.func,
  city: PropTypes.string,
};

const mapStateToProps = (state) => ({
  city: state.city,
  offersDataArray: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  onHeaderClick(city) {
    dispatch(ActionCreator.changeCiy(city));
  },
});

export { Main };
export default connect(mapStateToProps, mapDispatchToProps)(Main);
