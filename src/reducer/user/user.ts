import { createOffer } from '../../adapters/offers';
import { UserState, ActionTypes, UserActionTypes } from './types';
import { AuthStatus } from '../../const';
import { OfferInfo } from '../../types';
import { Dispatch } from 'redux';
import { AxiosInstance, AxiosResponse } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from '../reducer';
import { Cridetials } from '../../components/sign-in/sign-in';
import { NameSpace } from '../name-space';

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
  updateAuthStatus: (): ThunkAction<
    Promise<void>,
    AppStateType,
    unknown,
    UserActionTypes
  > => async (dispatch, _getState, api: AxiosInstance) => {
    try {
      const response = await api.get(`/login`);
      dispatch(ActionCreator.updateAuthStatus(AuthStatus.AUTH));
      dispatch(ActionCreator.updateUserEmail(response.data.email));
    } catch (err) {
      throw err;
    }
  },

  logIn: (
    authData: Cridetials,
  ): ThunkAction<
    Promise<void>,
    AppStateType,
    unknown,
    UserActionTypes
  > => async (dispatch, _getState, api: AxiosInstance) => {
    const response = await api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    });
    dispatch(ActionCreator.updateAuthStatus(AuthStatus.AUTH));
    dispatch(ActionCreator.updateUserEmail(response.data.email));
  },

  getFavorites: (): ThunkAction<
    Promise<void>,
    AppStateType,
    unknown,
    UserActionTypes
  > =>
    async function (dispatch, _getState, api: AxiosInstance) {
      const response = await api.get(`/favorite`);
      dispatch(ActionCreator.updateUserFavorites(response.data));
    },

  toggleFavorites: (
    id: number,
    status: number,
  ): ThunkAction<
    Promise<void>,
    AppStateType,
    unknown,
    UserActionTypes
  > => async (dispatch, getState, api: AxiosInstance) => {
    const toggleFavoriteRequest: AxiosResponse = await api.post(
      `/favorite/${id}/${status}`,
    );
    const currentFavorites: OfferInfo[] = getState()[NameSpace.USER]
      .userFavorites;

    const isFavorite: boolean = toggleFavoriteRequest.data.is_favorite;

    let userFavorite: OfferInfo[];

    isFavorite
      ? (userFavorite = [...currentFavorites, toggleFavoriteRequest.data])
      : (userFavorite = currentFavorites.filter(
          (favorite) =>
            Number(favorite.id) !== Number(toggleFavoriteRequest.data.id),
        ));

    dispatch(ActionCreator.updateUserFavorites(userFavorite));
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
