import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class CitiesList extends PureComponent {
  constructor(props) {
    super(props);

    this._onHeaderClick = this._onHeaderClick.bind(this);
  }

  _onHeaderClick(city) {
    this.props.onHeaderClick(city);
  }

  render() {
    const { offers, currentCity } = this.props;

    const uniqueCities = [];
    offers.map((offer) => {
      if (uniqueCities.indexOf(offer.city) === -1) {
        uniqueCities.push(offer.city);
      }
    });

    return (
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {uniqueCities.map((city, i) => {
            if (city === currentCity) {
              return (
                <li
                  key={`${i}-` + city.replace(/\s/g, '')}
                  className="locations__item"
                >
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      this._onHeaderClick(city);
                    }}
                    className="locations__item-link tabs__item tabs__item--active"
                    href="#"
                  >
                    <span>{city}</span>
                  </a>
                </li>
              );
            }
            return (
              <li
                key={`${i}-` + city.replace(/\s/g, '')}
                className="locations__item"
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    this._onHeaderClick(city);
                  }}
                  className="locations__item-link tabs__item"
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
}

CitiesList.propTypes = {
  onHeaderClick: PropTypes.func.isRequired,
  offers: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      quality: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      priceValue: PropTypes.string.isRequired,
      priceText: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      coords: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
  ),
  currentCity: PropTypes.string,
};

export default CitiesList;
