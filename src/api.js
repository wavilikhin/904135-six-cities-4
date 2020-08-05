import axios from 'axios';

const Error = {
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
};

export const createApi = (onUnauthorized) => {
  const api = axios.create({
    baseURL: 'https://4.react.pages.academy/six-cities',
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const { response } = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }

    if (response.status === Error.SERVER_ERROR) {
      throw new Error(`Server currently unavalibale`);
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
