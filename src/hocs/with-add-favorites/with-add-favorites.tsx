import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Operation as UserOperation } from "../../reducer/user/user";
import { getUserFavorites } from "../../reducer/user/selectors";
import { OfferInfo } from "../../components/offer-card/offer-card";

interface Props {
  getFavorites(): void;
  userFavorites: OfferInfo[];
  toggleFavorites(id: number, status: boolean): void;
}

const withAddFavorites = (Component) => {
  class WithAddFavorites extends PureComponent<Props> {
    props: Props;

    constructor(props) {
      super(props);

      this._toggleFavorite = this._toggleFavorite.bind(this);
      this._getFavorites = this._getFavorites.bind(this);
      this._updateFavorites = this._updateFavorites.bind(this);
    }
    _getFavorites(): void {
      this.props.getFavorites();
    }

    _toggleFavorite(id: number): void {
      let status;
      this.props.userFavorites.some((fav) => fav.id === id)
        ? (status = 0)
        : (status = 1);
      this.props.toggleFavorites(id, status);
    }

    _updateFavorites(id: number): void {
      this._toggleFavorite(id);
      this._getFavorites();
    }

    render() {
      const favoritesIds = [
        ...new Set(this.props.userFavorites.map((fav) => fav.id)),
      ];
      return (
        <Component
          {...this.props}
          handleFavoritesUpdate={(id) => {
            this._updateFavorites(id);
          }}
          favoritesIds={favoritesIds}
        />
      );
    }
  }

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
