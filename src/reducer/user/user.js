import { AuthStatus } from "../../const.js";
import { createOffer } from "../../adapters/offers.js";

const initialState = {
  authStatus: AuthStatus.NO_AUTH,
  userEmail: "",
  userFavorites: [],
};

const ActionType = {
  UPDATE_AUTH_STATUS: "UPDATE_AUTH_STATUS",
  UPDATE_USER_EMAIL: "UPDATE_USER_EMAIL",
  TOGGLE_FAVORITE: "TOGGLE_FAVORITE",
  UPDATE_USER_FAVORITES: "UPDATE_USER_FAVORITES",
};

const ActionCreator = {
  updateAuthStatus: (status) => ({
    type: ActionType.UPDATE_AUTH_STATUS,
    payload: status,
  }),

  updateUserEmail: (email) => ({
    type: ActionType.UPDATE_USER_EMAIL,
    payload: email,
  }),

  toggleFavorite: (id, status) => ({
    type: ActionType.TOGGLE_FAVORITE,
    payload: { id, status },
  }),

  updateUserFavorites: (favorites) => {
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
      .get("/login")
      .then((response) => {
        dispatch(ActionCreator.updateAuthStatus(AuthStatus.AUTH));
        dispatch(ActionCreator.updateUserEmail(response.data.email));
      })
      .catch((err) => {
        throw err;
      });
  },

  logIn: (authData) => (dispatch, getState, api) => {
    return api
      .post("/login", {
        email: authData.email,
        password: authData.password,
      })
      .then((response) => {
        dispatch(ActionCreator.updateAuthStatus(AuthStatus.AUTH));
        dispatch(ActionCreator.updateUserEmail(response.data.email));
      })
      .catch((err) => console.error(`Login error: ${err}`));
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

const reducer = (state = initialState, action) => {
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
