import { createOffer } from '../../adapters/offers';
import { UserState, ActionTypes, UserActionTypes } from './types';
import { AuthStatus } from '../../const';
import { OfferInfo } from '../../components/offer-card/offer-card';

const initialState: UserState = {
  authStatus: AuthStatus.NO_AUTH,
  userEmail: ``,
  userFavorites: [],
};

const ActionType = ActionTypes;

const ActionCreator = {
  updateAuthStatus: (status: AuthStatus): UserActionTypes => ({
    type: ActionType.UPDATE_AUTH_STATUS,
    payload: status,
  }),

  updateUserEmail: (email: string): UserActionTypes => ({
    type: ActionType.UPDATE_USER_EMAIL,
    payload: email,
  }),

  toggleFavorite: (id: number, status: boolean): UserActionTypes => ({
    type: ActionType.TOGGLE_FAVORITE,
    payload: { id, status },
  }),

  updateUserFavorites: (favorites: OfferInfo[]): UserActionTypes => {
    const adaptedOffers = favorites.map((fav) => {
      return createOffer(fav);
    });

    return {
      type: ActionType.UPDATE_USER_FAVORITES,
      payload: adaptedOffers,
    };
  },
};

const Operation = {
  updateAuthStatus: () => (dispatch, getState, api) => {
    return api
      .get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.updateAuthStatus(AuthStatus.AUTH));
        dispatch(ActionCreator.updateUserEmail(response.data.email));
      })
      .catch((err) => {
        throw err;
      });
  },

  logIn: (authData) => (dispatch, getState, api) => {
    return (
      api
        .post(`/login`, {
          email: authData.email,
          password: authData.password,
        })
        .then((response) => {
          dispatch(ActionCreator.updateAuthStatus(AuthStatus.AUTH));
          dispatch(ActionCreator.updateUserEmail(response.data.email));
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(`Login error: ${err}`))
    );
  },

  getFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`).then((response) => {
      dispatch(ActionCreator.updateUserFavorites(response.data));
    });
  },

  toggleFavorites: (id, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${status}`);
  },
};

const reducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case ActionType.UPDATE_AUTH_STATUS:
      return Object.assign({}, state, {
        authStatus: action.payload,
      });

    case ActionType.UPDATE_USER_EMAIL:
      return Object.assign({}, state, {
        userEmail: action.payload,
      });

    case ActionType.UPDATE_USER_FAVORITES:
      return Object.assign({}, state, {
        userFavorites: action.payload,
      });
  }
  return state;
};

export { reducer, ActionType, ActionCreator, Operation, AuthStatus };
