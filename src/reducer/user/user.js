const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authStatus: AuthorizationStatus.NO_AUTH,
  userEmail: '',
};

const ActionType = {
  UPDATE_AUTH_STATUS: 'UPDATE_AUTH_STATUS',
  UPDATE_USER_EMAIL: 'UPDATE_USER_EMAIL',
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
};

const Operation = {
  updateAuthStatus: () => (dispatch, getState, api) => {
    return api.get('/login').then(() => {
      dispatch(ActionCreator.updateAuthStatus(AuthorizationStatus.AUTH));
    });
  },

  logIn: (authData) => (dispatch, getState, api) => {
    return api
      .post('/login', {
        email: authData.email,
        password: authData.password,
      })
      .then((response) => {
        console.log(response);
        dispatch(ActionCreator.updateAuthStatus(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.updateUserEmail(response.email));
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
  }
  return state;
};

export { reducer, ActionType, ActionCreator, Operation, AuthorizationStatus };
