import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';
import { getCity, getFiltredOffers } from '../../reducer/data/selectors.js';

const Offers = (props) => {
  const { filtredOffers, city } = props;

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
            {/* <Map
              city={city}
              zoom={filtredOffers.length > 0 ? filtredOffers[0].cityZoom : 12}
              offers={filtredOffers}
            /> */}
          </section>
        </div>
      </div>
    </div>
  );
};

Offers.propTypes = {
  filtredOffers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      cityCoords: PropTypes.arrayOf(PropTypes.number, PropTypes.number),
      cityZoom: PropTypes.number.isRequired,
      isPremium: PropTypes.bool.isRequired,
      image: PropTypes.string.isRequired,
      priceValue: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      coords: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
    }),
  ).isRequired,
  city: PropTypes.string,
};

const mapStateToProps = (state) => ({
  city: getCity(state),
  filtredOffers: getFiltredOffers(state),
});

export { Offers };
export default connect(mapStateToProps, null)(Offers);
