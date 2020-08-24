import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Operation as DataOperation,
  ActionCreator,
} from '../../reducer/data/data.js';
import {
  getCurrentOffer,
  getCurrentOfferReviews,
  getCurrentOfferNearby,
} from '../../reducer/data/selectors.js';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import OfferCard from '../offer-card/offer-card.jsx';
import Map from '../map/map.jsx';
import withAddFavorites from '../../hocs/with-add-favorites/with-add-favorites.jsx';
const OfferCardWrapped = withAddFavorites(OfferCard);

class Room extends PureComponent {
  constructor(props) {
    super(props);

    this._updateReviews = this._updateReviews.bind(this);
    this._postReview = this._postReview.bind(this);
    this._updateNearby = this._updateNearby.bind(this);
    this._updateFavorites = this._updateFavorites.bind(this);
  }

  _updateReviews(id) {
    if (id === -1) {
      return;
    }
    this.props.updateReviews(id);
  }

  _postReview(hotelId, reviewData) {
    if (id === -1) {
      return;
    }
    this.props.postReview(hotelId, reviewData);
  }

  _updateNearby(id) {
    if (id === -1) {
      return;
    }
    this.props.updateNearby(id);
  }

  _updateFavorites(id) {
    if (id === -1) {
      return;
    }
    this.props.handleFavoritesUpdate(id);
  }

  componentDidMount() {
    this.props.handleCurrentOfferUpdate(this.props.offerId);
    this._updateReviews(this.props.offerId);
    this._updateNearby(this.props.offerId);
  }

  render() {
    const { defaultOffer, offer } = this.props;

    let currentOffer = {};
    Object.keys(offer).length === 0
      ? (currentOffer = defaultOffer)
      : (currentOffer = offer);

    const { reviews = [], offersNearby, favoritesIds } = this.props;

    const ratingStars = currentOffer.rating * 2 * 10;

    return (
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {currentOffer.images.map((image, i) => (
                <div className="property__image-wrapper" key={`${image}+${i}`}>
                  <img
                    className="property__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {currentOffer.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">{name}</h1>
                <button
                  className={`property__bookmark-button button ${
                    favoritesIds.some((fav) => fav === currentOffer.id)
                      ? 'property__bookmark-button--active'
                      : ''
                  }`}
                  type="button"
                  onClick={() => {
                    this._updateFavorites(id);
                  }}
                >
                  <svg
                    className="property__bookmark-icon"
                    width={31}
                    height={33}
                  >
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${ratingStars}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {currentOffer.rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">
                  €{currentOffer.priceValue}
                </b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What's inside</h2>
                <ul className="property__inside-list">
                  {currentOffer.goods.map((good, i) => (
                    <li className="property__inside-item" key={`${good}+${i}`}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div
                    className={`property__avatar-wrapper user__avatar-wrapper ${
                      currentOffer.host.isPro
                        ? 'property__avatar-wrapper--pro'
                        : ''
                    }`}
                  >
                    <img
                      className="property__avatar user__avatar"
                      src={`../${currentOffer.host.avatar_url}`}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {currentOffer.host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">{currentOffer.description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList reviews={reviews} />
                <ReviewForm
                  hotelId={currentOffer.id}
                  handleSubmit={this._postReview}
                />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              city={currentOffer.city}
              zoom={currentOffer.cityZoom}
              offers={offersNearby}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {offersNearby.map((offer, i) => {
                return (
                  <OfferCardWrapped key={`${offer.id}+${i}`} cardData={offer} />
                );
              })}
            </div>
          </section>
        </div>
      </main>
    );
  }
}

Room.defaultProps = {
  defaultOffer: {
    id: -1,
    city: '',
    city: '',
    cityZoom: 0,
    isPremium: false,
    cityCoords: [],
    image: '',
    priceValue: 0,
    name: '',
    type: '',
    coords: [],
    bedrooms: 0,
    description: '',
    goods: [],
    host: {
      isPro: false,
      avatar_url: '',
      name: '',
    },
    images: [],
    isFavorite: false,
    location: {},
    maxAdults: 0,
    rating: 0,
  },
};

const mapStateToProps = (state) => ({
  offer: getCurrentOffer(state),
  reviews: getCurrentOfferReviews(state),
  offersNearby: getCurrentOfferNearby(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateReviews(id) {
    dispatch(DataOperation.updateCurrentOfferReviews(id));
  },

  postReview(hotelId, reviewData) {
    dispatch(DataOperation.postReview(hotelId, reviewData));
  },

  updateNearby(id) {
    dispatch(DataOperation.updateCurrentOfferNearby(id));
  },

  handleCurrentOfferUpdate(id) {
    dispatch(ActionCreator.updateCurrentOffer(id));
  },
});

Room.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number,
    city: PropTypes.string,
    cityZoom: PropTypes.number,
    isPremium: PropTypes.bool,
    cityCoords: PropTypes.arrayOf(PropTypes.number),
    image: PropTypes.string,
    priceValue: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    coords: PropTypes.arrayOf(PropTypes.number),
    bedrooms: PropTypes.number,
    description: PropTypes.string,
    goods: PropTypes.arrayOf(PropTypes.string),
    host: PropTypes.shape({
      avatar_url: PropTypes.string,
      id: PropTypes.number,
      isPro: PropTypes.bool,
      name: PropTypes.string,
    }),
    images: PropTypes.arrayOf(PropTypes.string),
    isFavorite: PropTypes.bool,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    }),
    maxAdults: PropTypes.number,
    rating: PropTypes.number,
  }),
  offerId: PropTypes.number.isRequired,
  favoritesIds: PropTypes.arrayOf(PropTypes.number),
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      comment: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    }),
  ),
  updateReviews: PropTypes.func.isRequired,
  offersNearby: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      cityZoom: PropTypes.number.isRequired,
      isPremium: PropTypes.bool.isRequired,
      cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
      image: PropTypes.string.isRequired,
      priceValue: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      coords: PropTypes.arrayOf(PropTypes.number).isRequired,
      bedrooms: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      goods: PropTypes.arrayOf(PropTypes.string).isRequired,
      host: PropTypes.shape({
        avatar_url: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        isPro: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
      }),
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
      isFavorite: PropTypes.bool.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
      maxAdults: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
    }),
  ),
  updateNearby: PropTypes.func.isRequired,
  handleFavoritesUpdate: PropTypes.func.isRequired,
};

export { Room };
export default withAddFavorites(
  connect(mapStateToProps, mapDispatchToProps)(Room),
);
