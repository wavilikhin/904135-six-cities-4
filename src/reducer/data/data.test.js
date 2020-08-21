import MockAdapter from 'axios-mock-adapter';
import { createApi } from '../../api.js';
import { reducer, ActionType, ActionCreator, Operation } from './data.js';

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
      currentOffer: {},
      currentOfferNearby: [],
      currentOfferReviews: [],
    });
  });

  it(`Data reducer updates offers correctly`, () => {
    const offerFromServer = [
      {
        bedrooms: 4,
        city: {
          location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
          name: 'Paris',
        },

        description:
          'Design interior in most sympathetic area! Complitely renovated, well-equipped, cosy studio in idyllic, over 100 years old wooden house. Calm street, fast connection to center and airport.',
        goods: [
          'Fridge',
          'Washing machine',
          'Breakfast',
          'Air conditioning',
          'Coffee machine',
          'Baby seat',
          'Laptop friendly workspace',
          'Washer',
          'Towels',
          'Dishwasher',
        ],
        host: {
          avatar_url: 'img/avatar-angelina.jpg',
          id: 25,
          is_pro: true,
          name: 'Angelina',
        },

        id: 3,
        images: [
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/14.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/13.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg',
        ],

        is_favorite: true,
        is_premium: false,
        location: {
          latitude: 48.868610000000004,
          longitude: 2.342499,
          zoom: 16,
        },
        max_adults: 6,
        preview_image:
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg',
        price: 722,
        rating: 4.4,
        title: 'The Pondhouse - A Magical Place',
        type: 'house',
      },
    ];

    const createdOffer = [
      {
        id: 3,
        city: 'Paris',
        cityZoom: 13,
        isPremium: false,
        cityCoords: [48.85661, 2.351499],
        image:
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg',
        priceValue: 722,
        name: 'The Pondhouse - A Magical Place',
        type: 'house',
        coords: [48.868610000000004, 2.342499],
        bedrooms: 4,
        description:
          'Design interior in most sympathetic area! Complitely renovated, well-equipped, cosy studio in idyllic, over 100 years old wooden house. Calm street, fast connection to center and airport.',
        goods: [
          'Fridge',
          'Washing machine',
          'Breakfast',
          'Air conditioning',
          'Coffee machine',
          'Baby seat',
          'Laptop friendly workspace',
          'Washer',
          'Towels',
          'Dishwasher',
        ],
        host: {
          avatar_url: 'img/avatar-angelina.jpg',
          id: 25,
          isPro: true,
          name: 'Angelina',
        },
        images: [
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/14.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/13.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg',
          'https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg',
        ],
        isFavorite: true,
        location: {
          latitude: 48.868610000000004,
          longitude: 2.342499,
          zoom: 16,
        },
        maxAdults: 6,
        rating: 4.4,
      },
    ];

    expect(ActionCreator.updateOffers(offerFromServer)).toEqual({
      type: ActionType.UPDATE_OFFERS,
      payload: createdOffer,
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
