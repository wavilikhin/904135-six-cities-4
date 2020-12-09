import * as React from 'react';
import { connect } from 'react-redux';
import { Operation as UserOperation } from '../../reducer/user/user';
import { getUserFavorites } from '../../reducer/user/selectors';
import { OfferInfo } from '../../types';
import { AppStateType } from '../../reducer/reducer';
import { Diff } from 'utility-types';
import { string } from 'prop-types';

type StateToPropsTypes = {
  userFavorites: OfferInfo[];
};
type DispatchToPropsTypes = {
  toggleFavorites: (id: number, status: number) => void;
  getFavorites: () => void;
};

type InjectedPropsTypes = StateToPropsTypes & DispatchToPropsTypes;

export const withAddFavorites = <BasePropsTypes extends InjectedPropsTypes>(
  Component: React.ComponentType<BasePropsTypes>,
) => {
  const mapStateToProps = (state: AppStateType) => ({
    userFavorites: getUserFavorites(state),
  });

  const mapDispathcToProps = (dispatch) => ({
    toggleFavorites(id: number, status: number): void {
      dispatch(UserOperation.toggleFavorites(id, status));
    },

    getFavorites(): void {
      dispatch(UserOperation.getFavorites());
    },
  });

  type HocPropsTypes = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispathcToProps>;
  class Hoc extends React.PureComponent<HocPropsTypes> {
    props: HocPropsTypes;

    constructor(props: HocPropsTypes) {
      super(props);

      this._toggleFavorite = this._toggleFavorite.bind(this);
      this._getFavorites = this._getFavorites.bind(this);
      this._updateFavorites = this._updateFavorites.bind(this);
    }
    _getFavorites(): void {
      this.props.getFavorites();
    }

    _toggleFavorite(id: number): void {
      let status: number;
      this.props.userFavorites.some((fav) => fav.id === id)
        ? (status = 0)
        : (status = 1);
      this.props.toggleFavorites(id, status);
    }

    _updateFavorites(id: number): void {
      this._toggleFavorite(id);
      this._getFavorites();
    }

    static displayName = `withAddFavorites(${Component.name})`;

    static readonly WrappedComponent = Component;

    render() {
      const {
        getFavorites,
        toggleFavorites,
        userFavorites,
        ...restProps
      } = this.props;

      const favoritesIds = [
        ...new Set(this.props.userFavorites.map((fav) => fav.id)),
      ];

      return (
        <Component
          handleFavoritesUpdate={(id: number): void => {
            this._updateFavorites(id);
          }}
          favoritesIds={favoritesIds}
          {...(restProps as BasePropsTypes)}
        />
      );
    }
  }

  const ConnectedHoc = connect<
    StateToPropsTypes,
    DispatchToPropsTypes,
    Diff<BasePropsTypes, InjectedPropsTypes>,
    AppStateType
  >(
    mapStateToProps,
    mapDispathcToProps,
  )(Hoc);

  return ConnectedHoc;
};
