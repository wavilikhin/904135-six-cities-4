import { AuthStatus } from '../../const';
import { OfferInfo } from '../../types';

export interface UserState {
  authStatus: AuthStatus;
  userEmail: string;
  userFavorites: OfferInfo[];
}

export enum ActionTypes {
  UPDATE_AUTH_STATUS = `UPDATE_AUTH_STATUS`,
  UPDATE_USER_EMAIL = `UPDATE_USER_EMAIL`,
  TOGGLE_FAVORITE = `TOGGLE_FAVORITE`,
  UPDATE_USER_FAVORITES = `UPDATE_USER_FAVORITES`,
}

interface UpdateAuthStatusAction {
  type: ActionTypes;
  payload: AuthStatus;
}

interface UpdateUserEmailAction {
  type: ActionTypes;
  payload: string;
}

interface ToggleFavoriteAction {
  type: ActionTypes;
  payload: { id: number; status: boolean };
}

interface UpdateUserFavoritesAction {
  type: ActionTypes;
  payload: OfferInfo[];
}

export type UserActionTypes =
  | UpdateAuthStatusAction
  | UpdateUserEmailAction
  | ToggleFavoriteAction
  | UpdateUserFavoritesAction;
