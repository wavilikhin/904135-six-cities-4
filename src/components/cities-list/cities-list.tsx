import React, { memo } from "react";

import { connect } from "react-redux";
import { ActionCreator as StateActionCreator } from "../../reducer/state/state";
import { getCity, getUniqueCities } from "../../reducer/data/selectors";

interface Props {
  currentCity: string;
  uniqueCities: string[];
  handleCityChange(city: string): void;
}

const CitiesList: React.FC<Props> = memo(
  ({ currentCity, uniqueCities, handleCityChange }) => {
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
                    city === currentCity ? "tabs__item--active" : ""
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
  }
);

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
