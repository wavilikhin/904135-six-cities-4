import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator as StateActionCreator } from '../../reducer/state/state.js';
import {
  getCity,
  getUniqueCities,
  getFiltredOffers,
} from '../../reducer/data/selectors.js';
import { ActionCreator as UserActionCreator } from '../../reducer/user/user.js';
import { getUserFavorites } from '../../reducer/user/selectors.js';

const withActiveItem = (Component, config) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null,
      };

      this._handleActiveChange = this._handleActiveChange.bind(this);
      this._handleFavoritesUpdate = this._handleFavoritesUpdate.bind(this);
    }

    _handleActiveChange(item) {
      this.setState({
        activeItem: item,
      });

      config.stateUpdateRequired ? this.props.handleCityChange(item) : '';
    }

    _handleFavoritesUpdate(id) {
      this.props.handleFavoritesChange(id);
    }

    render() {
      return (
        <Component
          {...this.props}
          activeItem={this.state.activeItem}
          onActiveItemChange={(item) => {
            this._handleActiveChange(item);
          }}
          onFavoritesUpdate={(id) => {
            this._handleFavoritesUpdate(id);
          }}
        />
      );
    }
  }

  WithActiveItem.propTypes = {
    offersArray: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        isPremium: PropTypes.bool.isRequired,
        image: PropTypes.string.isRequired,
        priceValue: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        coords: PropTypes.arrayOf(PropTypes.number).isRequired,
      }),
    ),
    handleCityChange: PropTypes.func,
    currentCity: PropTypes.string.isRequired,
    uniqueCities: PropTypes.arrayOf(PropTypes.string).isRequired,
    userFavorites: PropTypes.arrayOf(PropTypes.number),
  };

  const mapStateToProps = (state) => ({
    offersArray: getFiltredOffers(state),
    currentCity: getCity(state),
    uniqueCities: getUniqueCities(state),
    userFavorites: getUserFavorites(state),
  });

  const mapDispathcToProps = (dispatch) => ({
    handleCityChange(city) {
      dispatch(StateActionCreator.changeCiy(city));
    },
    handleFavoritesChange(id) {
      dispatch(UserActionCreator.updateUserFavorites(id));
    },
  });

  return connect(mapStateToProps, mapDispathcToProps)(WithActiveItem);
};

export default withActiveItem;
