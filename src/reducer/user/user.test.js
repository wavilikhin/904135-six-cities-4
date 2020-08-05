import MockAdapter from 'axios-mock-adapter';
import { createApi } from '../../api.js';
import { reducer, ActionType, Operation } from './user.js';

const api = createApi(() => {});

it(`User reducer without additional params returns initnial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authStatus: 'NO_AUTH',
    userEmail: '',
  });
});

describe(`User reducer works well`, () => {
  it(`User reducer updates authStatus correctly`, () => {
    expect(
      reducer(void 0, {
        type: ActionType.UPDATE_AUTH_STATUS,
        payload: 'AUTH',
      }),
    ).toEqual({
      authStatus: 'AUTH',
      userEmail: '',
    });
  });

  it(`User reducer updates userEmail correctly`, () => {
    expect(
      reducer(void 0, {
        type: ActionType.UPDATE_USER_EMAIL,
        payload: 'test@mail.ru',
      }),
    ).toEqual({
      authStatus: 'NO_AUTH',
      userEmail: 'test@mail.ru',
    });
  });
});

describe(`User Operation works well`, () => {
  it(`Should make correct api call for auth status`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const updateAuthStatus = Operation.updateAuthStatus();

    apiMock.onGet('/login').reply(200, { id: 1, email: 'fake.mail@com' });

    return updateAuthStatus(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.UPDATE_AUTH_STATUS,
        payload: 'AUTH',
      });
    });
  });

  it(`Should make correct api call for login (Dispatch is fired 2 times: 1 for authStatus update and 1 for userEmailUpdate)`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logIn = Operation.logIn({
      email: 'fake.mail@com',
      password: 'fakepass',
    });

    apiMock.onPost('/login').reply(200, { id: 1, email: 'fake.mail@com' });

    return logIn(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.UPDATE_AUTH_STATUS,
        payload: 'AUTH',
      });
    });
  });
});
