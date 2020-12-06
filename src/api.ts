import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

enum Errors {
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
}

interface ErrorWithMessage extends Error {
  data: {};
}

class ErrorWithMessage extends Error {
  constructor(message: string, data: {}) {
    super();

    this.message = message;
    this.data = data;
  }
}

export const createApi = (onUnauthorized: () => void): AxiosInstance => {
  const api: AxiosInstance = axios.create({
    baseURL: `https://4.react.pages.academy/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  const onFail = (err: AxiosError): AxiosError => {
    const { response } = err;

    if (response.status === Errors.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }

    if (response.status === Errors.BAD_REQUEST) {
      throw new ErrorWithMessage(`Bad request`, response.data.error);
    }

    if (response.status === Errors.SERVER_ERROR) {
      throw new ErrorWithMessage(`Server unavaliable`, response.data.error);
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
