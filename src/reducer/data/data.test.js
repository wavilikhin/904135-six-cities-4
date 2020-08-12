import MockAdapter from 'axios-mock-adapter';
import { createApi } from '../../api.js';
import { reducer, ActionType, Operation } from './data.js';

const api = createApi(() => {});

const offers = [
  {
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    preview_image:
      'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg',
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
    title: 'Wood and stone place',
    is_favorite: true,
    is_premium: false,
    rating: 2.4,
    type: 'house',
    bedrooms: 5,
    max_adults: 6,
    price: 813,
    goods: ['Laptop friendly workspace'],
    host: {
      id: 25,
      name: 'Angelina',
      is_pro: true,
      avatar_url: 'img/avatar-angelina.jpg',
    },
    description:
      'I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.',
    location: {
      latitude: 52.385540000000006,
      longitude: 4.886976,
      zoom: 16,
    },
    id: 1,
  },
];

describe(`Data reducer test`, () => {
  it(`Data reducer without additional params returns initnial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      offers: [],
    });
  });

  it(`Data reducer updates offers correctly`, () => {
    expect(
      reducer(void 0, {
        type: ActionType.UPDATE_OFFERS,
        payload: [
          {
            bedrooms: 3,
            city: {
              location: {
                latitude: 52.370216,
                longitude: 4.895168,
                zoom: 10,
              },
              name: 'Amsterdam',
            },
            description:
              'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
            goods: [
              'Heating',
              'Kitchen',
              'Cable TV',
              'Washing machine',
              'Coffee machine',
              'Dishwasher',
            ],
            host: {
              avatar_url: 'img/1.png',
              id: 3,
              is_pro: true,
              name: 'Angelina',
            },
            id: 1,
            images: ['img/1.png', 'img/2.png'],
            is_favorite: false,
            is_premium: false,
            location: {
              latitude: 52.35514938496378,
              longitude: 4.673877537499948,
              zoom: 8,
            },
            max_adults: 4,
            preview_image: 'img/1.png',
            price: 120,
            rating: 4.8,
            title: 'Beautiful & luxurious studio at great location',
            type: 'apartment',
          },
        ],
      }),
    ).toEqual({
      offers: [
        {
          bedrooms: 3,
          city: {
            location: {
              latitude: 52.370216,
              longitude: 4.895168,
              zoom: 10,
            },
            name: 'Amsterdam',
          },
          description:
            'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
          goods: [
            'Heating',
            'Kitchen',
            'Cable TV',
            'Washing machine',
            'Coffee machine',
            'Dishwasher',
          ],
          host: {
            avatar_url: 'img/1.png',
            id: 3,
            is_pro: true,
            name: 'Angelina',
          },
          id: 1,
          images: ['img/1.png', 'img/2.png'],
          is_favorite: false,
          is_premium: false,
          location: {
            latitude: 52.35514938496378,
            longitude: 4.673877537499948,
            zoom: 8,
          },
          max_adults: 4,
          preview_image: 'img/1.png',
          price: 120,
          rating: 4.8,
          title: 'Beautiful & luxurious studio at great location',
          type: 'apartment',
        },
      ],
    });
  });

  it('Should make correct api call to "/hotels" ', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersUpdater = Operation.updateOffers();

    apiMock.onGet('/hotels').reply(200, offers);

    return offersUpdater(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.UPDATE_OFFERS,
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
            isFavorite: true,
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
