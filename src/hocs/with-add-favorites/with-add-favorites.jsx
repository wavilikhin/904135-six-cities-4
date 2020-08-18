import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Operation as UserOperation } from '../../reducer/user/user.js';
import { getUserFavorites } from '../../reducer/user/selectors.js';

const withAddFavorites = (Component) => {
  class WithAddFavorites extends PureComponent {
    constructor(props) {
      super(props);

      this._toggleFavorite = this._toggleFavorite.bind(this);
      this._getFavorites = this._getFavorites.bind(this);
      this._updateFavorites = this._updateFavorites.bind(this);
    }
    _getFavorites() {
      this.props.getFavorites();
    }

    _toggleFavorite(id) {
      let status;
      this.props.userFavorites.some((fav) => fav.id === id)
        ? (status = 0)
        : (status = 1);
      this.props.toggleFavorites(id, status);
    }

    _updateFavorites(id) {
      this._toggleFavorite(id);
      this._getFavorites();
    }

    render() {
      return (
        <Component
          {...this.props}
          handleFavoritesUpdate={(id) => {
            this._updateFavorites(id);
          }}
          getFavorites={this._getFavorites}
        />
      );
    }
  }

  WithAddFavorites.propTypes = {
    userFavorites: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        city: PropTypes.string.isRequired,
        cityZoom: PropTypes.number.isRequired,
        isPremium: PropTypes.bool.isRequired,
        cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
        image: PropTypes.string.isRequired,
        priceValue: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        coords: PropTypes.arrayOf(PropTypes.number).isRequired,
        bedrooms: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        goods: PropTypes.arrayOf(PropTypes.string).isRequired,
        host: PropTypes.shape({
          avatar_url: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
          isPro: PropTypes.bool.isRequired,
          name: PropTypes.string.isRequired,
        }),
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        isFavorite: PropTypes.bool.isRequired,
        location: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired,
        }),
        maxAdults: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
      }),
    ).isRequired,
    toggleFavorites: PropTypes.func.isRequired,
    getFavorites: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    userFavorites: getUserFavorites(state),
  });

  const mapDispathcToProps = (dispatch) => ({
    toggleFavorites(id, status) {
      dispatch(UserOperation.toggleFavorites(id, status));
    },

    getFavorites() {
      dispatch(UserOperation.getFavorites());
    },
  });

  return connect(mapStateToProps, mapDispathcToProps)(WithAddFavorites);
};

export default withAddFavorites;
