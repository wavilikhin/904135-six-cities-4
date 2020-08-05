import MockAdapter from 'axios-mock-adapter';
import { createApi } from '../../api.js';
import { reducer, ActionType, Operation } from './data.js';

const api = createApi(() => {});

const offers = [
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
];

describe(`Data reducer works well`, () => {
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
});

describe('Operation works well', () => {
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
            city: 'Amsterdam',
            cityZoom: 10,
            isPremium: false,
            cityCoords: [52.370216, 4.895168],
            image: 'img/1.png',
            priceValue: `\u20AC120`,
            priceText: ` \u2215\u0020night`,
            name: 'Beautiful & luxurious studio at great location',
            type: 'apartment',
            coords: [52.35514938496378, 4.673877537499948],
          },
        ],
      });
    });
  });
});
