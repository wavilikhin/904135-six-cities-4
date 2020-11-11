import MockAdapter from 'axios-mock-adapter';
import { createApi } from '../../api.js';
import { reducer, ActionType, Operation } from './user.js';

const api = createApi(() => {});

describe(`User reducer ActionCreator test`, () => {
  it(`User reducer without additional params returns initnial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      authStatus: 'NO_AUTH',
      userEmail: '',
      userFavorites: [],
    });
  });

  it(`User reducer updates authStatus correctly`, () => {
    expect(
      reducer(void 0, {
        type: ActionType.UPDATE_AUTH_STATUS,
        payload: 'AUTH',
      }),
    ).toEqual({
      authStatus: 'AUTH',
      userEmail: '',
      userFavorites: [],
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
      userFavorites: [],
    });
  });

  it(`User reducer updates userFavorites correctly`, () => {
    expect(
      reducer(void 0, {
        type: ActionType.UPDATE_USER_FAVORITES,
        payload: {
          id: 1,
          city: 'Amsterdam',
          cityZoom: 13,
          isPremium: false,
          cityCoords: [52.37454, 4.897976],
          image:
            'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg',
          priceValue: 813,
          name: 'Wood and stone place',
          type: 'house',
          coords: [52.385540000000006, 4.886976],
          bedrooms: 5,
          description:
            'I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.',
          goods: ['Laptop friendly workspace'],
          host: {
            avatar_url: 'img/avatar-angelina.jpg',
            id: 25,
            isPro: true,
            name: 'Angelina',
          },
          images: [
            'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg',
            'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg',
            'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg',
            'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg',
            'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg',
            'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg',
            'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg',
            'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg',
            'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg',
            'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg',
            'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg',
            'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg',
            'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg',
            'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg',
          ],
          isFavorite: true,
          location: {
            latitude: 52.385540000000006,
            longitude: 4.886976,
            zoom: 16,
          },
          maxAdults: 6,
          rating: 2.4,
        },
      }),
    ).toEqual({
      authStatus: 'NO_AUTH',
      userEmail: '',
      userFavorites: {
        id: 1,
        city: 'Amsterdam',
        cityZoom: 13,
        isPremium: false,
        cityCoords: [52.37454, 4.897976],
        image:
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg',
        priceValue: 813,
        name: 'Wood and stone place',
        type: 'house',
        coords: [52.385540000000006, 4.886976],
        bedrooms: 5,
        description:
          'I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.',
        goods: ['Laptop friendly workspace'],
        host: {
          avatar_url: 'img/avatar-angelina.jpg',
          id: 25,
          isPro: true,
          name: 'Angelina',
        },
        images: [
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg',
        ],
        isFavorite: true,
        location: {
          latitude: 52.385540000000006,
          longitude: 4.886976,
          zoom: 16,
        },
        maxAdults: 6,
        rating: 2.4,
      },
    });
  });
});

describe(`User reducer Operation test`, () => {
  it(`Should make correct api call for auth status`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const updateAuthStatus = Operation.updateAuthStatus();

    apiMock.onGet('/login').reply(200, { id: 1, email: 'fake.mail@com' });

    return updateAuthStatus(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
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

  it(`Should make correct api call for getFavorites `, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const getFavorites = Operation.getFavorites();

    apiMock.onGet(`/favorite`).reply(200, [
      {
        bedrooms: 5,
        city: {
          location: { latitude: 52.37454, longitude: 4.897976, zoom: 13 },
          name: 'Amsterdam',
        },

        description:
          'I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.',
        goods: ['Laptop friendly workspace'],

        host: {
          avatar_url: 'img/avatar-angelina.jpg',
          id: 25,
          is_pro: true,
          name: 'Angelina',
        },

        id: 1,
        images: [
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg',
        ],

        is_favorite: false,
        is_premium: false,
        location: {
          latitude: 52.385540000000006,
          longitude: 4.886976,
          zoom: 16,
        },

        max_adults: 6,
        preview_image:
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg',
        price: 813,
        rating: 2.4,
        title: 'Wood and stone place',
        type: 'house',
      },
    ]);

    return getFavorites(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.UPDATE_USER_FAVORITES,
        payload: [
          {
            id: 1,
            city: 'Amsterdam',
            cityZoom: 13,
            isPremium: false,
            cityCoords: [52.37454, 4.897976],
            image:
              'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg',
            priceValue: 813,
            name: 'Wood and stone place',
            type: 'house',
            coords: [52.385540000000006, 4.886976],
            bedrooms: 5,
            description:
              'I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.',
            goods: ['Laptop friendly workspace'],
            host: {
              avatar_url: 'img/avatar-angelina.jpg',
              id: 25,
              isPro: true,
              name: 'Angelina',
            },
            images: [
              'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg',
              'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg',
              'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg',
              'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg',
              'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg',
              'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg',
              'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg',
              'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg',
              'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg',
              'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg',
              'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg',
              'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg',
              'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg',
              'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg',
            ],
            isFavorite: false,
            location: {
              latitude: 52.385540000000006,
              longitude: 4.886976,
              zoom: 16,
            },
            maxAdults: 6,
            rating: 2.4,
          },
        ],
      });
    });
  });
});
