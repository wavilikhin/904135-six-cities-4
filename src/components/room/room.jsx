import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Operation as DataOperation } from '../../reducer/data/data.js';
import {
  getCurrentOffer,
  getCurrentOfferReviews,
  getCurrentOfferNearby,
} from '../../reducer/data/selectors.js';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import OfferCard from '../offer-card/offer-card.jsx';

class Room extends PureComponent {
  constructor(props) {
    super(props);

    this._updateReviews = this._updateReviews.bind(this);
    this._postReview = this._postReview.bind(this);
    this._updateNearby = this._updateNearby.bind(this);
  }

  _updateReviews(id) {
    this.props.updateReviews(id);
  }

  _postReview(hotelId, reviewData) {
    this.props.postReview(hotelId, reviewData);
  }

  _updateNearby(id) {
    this.props.updateNearby(id);
  }

  componentDidMount() {
    this._updateReviews(this.props.currentOffer.id);
    this._updateNearby(this.props.currentOffer.id);
  }

  render() {
    const {
      id,
      city,
      cityZoom,
      isPremium,
      cityCoords,
      image,
      priceValue,
      name,
      type,
      coords,
      bedrooms,
      description,
      goods,
      host,
      images,
      isFavorite,
      location,
      maxAdults,
      rating,
    } = this.props.currentOffer;

    const { reviews = [], offersNearby } = this.props;

    return (
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image, i) => (
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
              {isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">{name}</h1>
                <button
                  className="property__bookmark-button button"
                  type="button"
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
                  <span style={{ width: '80%' }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{priceValue}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What's inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good, i) => (
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
                      host.isPro ? 'property__avatar-wrapper--pro' : ''
                    }`}
                  >
                    <img
                      className="property__avatar user__avatar"
                      src={`../${host.avatar_url}`}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{host.name}</span>
                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList reviews={reviews} />
                <ReviewForm hotelId={id} handleSubmit={this._postReview} />
              </section>
            </div>
          </div>
          <section className="property__map map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {/* TODO:  Доработать HOC add to favorites, обновить пропсы */}
              {offersNearby.map((offer, i) => {
                return (
                  <OfferCard
                    key={`${offer.id}+${i}`}
                    cardData={offer}
                    handleToggleFavorites={() => {}}
                    favoritesIds={[]}
                    handleCurrentOfferUpdate={() => {}}
                    handleGetFavorites={() => {}}
                  />
                );
              })}
            </div>
          </section>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  currentOffer: getCurrentOffer(state),
  reviews: getCurrentOfferReviews(state),
  offersNearby: getCurrentOfferNearby(state),
});

const mapDispatchToPops = (dispatch) => ({
  updateReviews(id) {
    dispatch(DataOperation.updateCurrentOfferReviews(id));
  },

  postReview(hotelId, reviewData) {
    dispatch(DataOperation.postReview(hotelId, reviewData));
  },

  updateNearby(id) {
    dispatch(DataOperation.updateCurrentOfferNearby(id));
  },
});

Room.propTypes = {
  currentOffer: PropTypes.shape({
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
  offerId: PropTypes.string.isRequired,
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
};

export { Room };
export default connect(mapStateToProps, mapDispatchToPops)(Room);
