import * as React from 'react';

import { connect } from 'react-redux';
import { ActionCreator as StateActionCreator } from '../../reducer/state/state';
import { getUniqueCities } from '../../reducer/data/selectors';
import { getCity } from '../../reducer/state/selectors';
import { Dispatch } from 'redux';
import { AppStateType } from '../../reducer/reducer';
import { AppActionCreator } from '../../reducer/types';

type StateToPropsTypes = {
  currentCity: string;
  uniqueCities: string[];
};

type DispatchToPropsTypes = {
  handleCityChange: (city: string) => void;
};

type Props = StateToPropsTypes & DispatchToPropsTypes;

const CitiesList: React.FC<Props> = React.memo(
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
  },
);

const mapStateToProps = (state: AppStateType) => ({
  currentCity: getCity(state),
  uniqueCities: getUniqueCities(state),
});

// FIXME: Dispatch type
const mapDispathcToProps = (dispatch: Dispatch<AppActionCreator>) => ({
  handleCityChange(city: string) {
    dispatch(StateActionCreator.changeCiy(city));
  },
});

export { CitiesList };

export default connect<
  StateToPropsTypes,
  DispatchToPropsTypes,
  {},
  AppStateType
>(
  mapStateToProps,
  mapDispathcToProps,
)(CitiesList);
