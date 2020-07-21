import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../../reducer';

class CitiesList extends PureComponent {
  constructor(props) {
    super(props);

    this._handleCityChange = this._handleCityChange.bind(this);
  }

  _handleCityChange(city) {
    this.props.handleCityChange(city);
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
            return (
              <li
                key={`${i}-` + city.replace(/\s/g, '')}
                className="locations__item"
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    this._handleCityChange(city);
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
  }
}

CitiesList.propTypes = {
  handleCityChange: PropTypes.func.isRequired,
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

const mapStateToProps = (state) => ({
  offers: state.offers,
  currentCity: state.city,
});

const mapDispatchToProps = (dispatch) => ({
  handleCityChange(city) {
    dispatch(ActionCreator.changeCiy(city));
  },
});

export { CitiesList };
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
