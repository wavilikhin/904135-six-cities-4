import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';

const Offers = (props) => {
  const { offersDataArray, city } = props;

  const filtredOffers = offersDataArray.filter((offer) => {
    return offer.city === city;
  });

  return (
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
          <OffersList />
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map city={city} zoom={12} offers={filtredOffers} />
          </section>
        </div>
      </div>
    </div>
  );
};

Offers.propTypes = {
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
  city: PropTypes.string,
};

const mapStateToProps = (state) => ({
  city: state.city,
  offersDataArray: state.offers,
});

export { Offers };
export default connect(mapStateToProps, null)(Offers);
