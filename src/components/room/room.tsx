import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Operation as DataOperation,
  ActionCreator,
} from "../../reducer/data/data";
import {
  getCurrentOfferReviews,
  getCurrentOfferNearby,
  getOffers,
} from "../../reducer/data/selectors";
import ReviewsList from "../reviews-list/reviews-list";
import ReviewForm from "../review-form/review-form";
import { OfferCard, OfferInfo } from "../offer-card/offer-card";
import { ReviewItemType } from "../review-item/review-item";
import Map from "../map/map";
import withAddFavorites from "../../hocs/with-add-favorites/with-add-favorites";
const OfferCardWrapped = withAddFavorites(OfferCard);

interface Props {
  defaultOffer: OfferInfo;
  offers: OfferInfo[];
  reviews: ReviewItemType[];
  offersNearby: OfferInfo[];
  favoritesIds: number[];
  offerId: number;
  updateReviews(id: number): void;
  postReview(hotelId: number, reviewData: ReviewItemType): void;
  updateNearby(id: number): void;
  handleCurrentOfferUpdate(id: number): void;
  handleFavoritesUpdate(id: number): void;
}

class Room extends PureComponent<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this._updateReviews = this._updateReviews.bind(this);
    this._postReview = this._postReview.bind(this);
    this._updateNearby = this._updateNearby.bind(this);
    this._updateFavorites = this._updateFavorites.bind(this);
  }

  _updateReviews(id: number): void {
    if (id === -1) {
      return;
    }
    this.props.updateReviews(id);
  }

  _postReview(hotelId: number, reviewData: ReviewItemType): void {
    if (hotelId === -1) {
      return;
    }
    this.props.postReview(hotelId, reviewData);
  }

  _updateNearby(id: number): void {
    if (id === -1) {
      return;
    }
    this.props.updateNearby(id);
  }

  _updateFavorites(id: number): void {
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
    const {
      defaultOffer,
      offers,
      reviews = [],
      offersNearby,
      favoritesIds,
      offerId,
    } = this.props;

    let currentOffer;
    offers.length > 0
      ? (currentOffer = offers.find((offer) => offer.id == offerId))
      : (currentOffer = defaultOffer);

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
                      ? "property__bookmark-button--active"
                      : ""
                  }`}
                  type="button"
                  onClick={() => {
                    this._updateFavorites(offer.id);
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
                        ? "property__avatar-wrapper--pro"
                        : ""
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

  static defaultProps = {
    defaultOffer: {
      id: -1,
      city: "",
      cityZoom: 0,
      isPremium: false,
      cityCoords: [],
      image: "",
      priceValue: 0,
      name: "",
      type: "",
      coords: [],
      bedrooms: 0,
      description: "",
      goods: [],
      host: {
        isPro: false,
        avatar_url: "",
        name: "",
      },
      images: [],
      isFavorite: false,
      location: {},
      maxAdults: 0,
      rating: 0,
    },
  };
}

// Room.defaultProps = {
//   defaultOffer: {
//     id: -1,
//     city: "",
//     cityZoom: 0,
//     isPremium: false,
//     cityCoords: [],
//     image: "",
//     priceValue: 0,
//     name: "",
//     type: "",
//     coords: [],
//     bedrooms: 0,
//     description: "",
//     goods: [],
//     host: {
//       isPro: false,
//       avatar_url: "",
//       name: "",
//     },
//     images: [],
//     isFavorite: false,
//     location: {},
//     maxAdults: 0,
//     rating: 0,
//   },
// };

const mapStateToProps = (state) => ({
  offers: getOffers(state),
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

export { Room };
export default withAddFavorites(
  connect(mapStateToProps, mapDispatchToProps)(Room)
);
