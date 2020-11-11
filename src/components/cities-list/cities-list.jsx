import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { ActionCreator as StateActionCreator } from '../../reducer/state/state.js';
import { getCity, getUniqueCities } from '../../reducer/data/selectors.js';

let CitiesList = memo(({ currentCity, uniqueCities, handleCityChange }) => {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {uniqueCities.map((city, i) => {
          return (
            <li key={`${i}-${city}`} className="locations__item">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  handleCityChange(city);
                }}
                className={`locations__item-link tabs__item ${
                  city === currentCity ? 'tabs__item--active' : ''
                }`}
                href="#"
              >
                <span>{city}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
});

CitiesList.propTypes = {
  currentCity: PropTypes.string.isRequired,
  uniqueCities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: getCity(state),
  uniqueCities: getUniqueCities(state),
});

const mapDispathcToProps = (dispatch) => ({
  handleCityChange(city) {
    dispatch(StateActionCreator.changeCiy(city));
  },
});

export { CitiesList };

export default connect(mapStateToProps, mapDispathcToProps)(CitiesList);
