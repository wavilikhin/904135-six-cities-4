import { AuthStatus } from '../../const.js';

const initialState = {
  authStatus: AuthStatus.NO_AUTH,
  userEmail: '',
  userFavorites: [],
};

const ActionType = {
  UPDATE_AUTH_STATUS: 'UPDATE_AUTH_STATUS',
  UPDATE_USER_EMAIL: 'UPDATE_USER_EMAIL',
  UPDATE_USER_FAVORITES: 'UPDATE_USER_FAVORITES',
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

  updateUserFavorites: (id, isFavorite) => {
    return {
      type: ActionType.UPDATE_USER_FAVORITES,
      payload: { id, isFavorite },
    };
  },
};

const Operation = {
  updateAuthStatus: () => (dispatch, getState, api) => {
    return api
      .get('/login')
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
      .post('/login', {
        email: authData.email,
        password: authData.password,
      })
      .then((response) => {
        dispatch(ActionCreator.updateAuthStatus(AuthStatus.AUTH));
        dispatch(ActionCreator.updateUserEmail(response.data.email));
      });
  },

  updateFavorites: (id, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${status}`).then((response) => {
      dispatch(
        ActionCreator.updateUserFavorites(id, response.data.is_favorite),
      );
    });
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
      let updatedFavorites = [];
      action.payload.isFavorite === true
        ? (updatedFavorites = [...state.userFavorites, action.payload.id])
        : (updatedFavorites = state.userFavorites.filter(
            (id) => id !== action.payload.id,
          ));
      return Object.assign({}, state, {
        userFavorites: updatedFavorites,
      });
  }
  return state;
};

export { reducer, ActionType, ActionCreator, Operation, AuthStatus };
