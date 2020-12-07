import NameSpace from '../name-space';

const NAME_SPACE = NameSpace.USER;

export const getAuthStatus = (state) => {
  return state[NAME_SPACE].authStatus;
};

export const getUserEmail = (state) => {
  return state[NAME_SPACE].userEmail;
};

export const getUserFavorites = (state) => {
  return state[NAME_SPACE].userFavorites;
};
