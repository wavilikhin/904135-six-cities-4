import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../../reducer/state/state.js';
import {
  getCity,
  getUniqueCities,
  getFiltredOffers,
} from '../../reducer/data/selectors.js';

const withActiveItem = (Component, config) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null,
      };

      this._handleActiveChange = this._handleActiveChange.bind(this);
    }

    _handleActiveChange(item) {
      this.setState({
        activeItem: item,
      });

      config.stateUpdateRequired ? this.props.handleCityChange(item) : '';
    }

    render() {
      return (
        <Component
          {...this.props}
          activeItem={this.state.activeItem}
          onActiveItemChange={(item) => {
            this._handleActiveChange(item);
          }}
        />
      );
    }
  }

  WithActiveItem.propTypes = {
    offersArray: PropTypes.arrayOf(
      PropTypes.shape({
        isPremium: PropTypes.bool.isRequired,
        image: PropTypes.string.isRequired,
        priceValue: PropTypes.string.isRequired,
        priceText: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        coords: PropTypes.arrayOf(PropTypes.number).isRequired,
      }),
    ),
    handleCityChange: PropTypes.func,
    currentCity: PropTypes.string.isRequired,
    uniqueCities: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  const mapStateToProps = (state) => ({
    offersArray: getFiltredOffers(state),
    currentCity: getCity(state),
    uniqueCities: getUniqueCities(state),
  });

  let mapDispathcToProps;
  config.stateUpdateRequired
    ? (mapDispathcToProps = (dispatch) => ({
        handleCityChange(city) {
          dispatch(ActionCreator.changeCiy(city));
        },
      }))
    : (mapDispathcToProps = null);

  return connect(mapStateToProps, mapDispathcToProps)(WithActiveItem);
};

export default withActiveItem;
