import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';
import { getCity, getFiltredOffers } from '../../reducer/data/selectors.js';
import MainEmpty from '../main-empty/main-empty.jsx';
import PlaceSorting from '../place-sorting/place-sorting.jsx';

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
          <PlaceSorting />
          {filtredOffers.length === 0 ? (
            <MainEmpty city={city} />
          ) : (
            <OffersList />
          )}
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            {filtredOffers.length === 0 ? (
              ''
            ) : (
              <Map
                city={city}
                zoom={filtredOffers[0].cityZoom}
                offers={filtredOffers}
              />
            )}
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
