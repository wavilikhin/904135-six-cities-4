import axios from 'axios';

const Error = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
};

export const createApi = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }

    if (response.status === Error.BAD_REQUEST) {
      throw new Error(`Bad request`, response.data.error);
    }

    if (response.status === Error.SERVER_ERROR) {
      throw new Error(`Server unavaliable`, response.data.error);
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
