import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class OfferCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._handleFavoritesUpdate = this._handleFavoritesUpdate.bind(this);
  }

  _handleMouseEnter() {
    this.props.handleHover(this.props.cardData);
  }

  _handleMouseLeave() {
    this.props.handleHover(null);
  }

  _handleFavoritesUpdate(id) {
    this.props.handleFavoritesUpdate(id);
  }

  render() {
    const {
      cardData: { id, isPremium, image, priceValue, name, type },
      userFavorites,
    } = this.props;

    return (
      <article
        className="cities__place-card place-card"
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
      >
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img
              className="place-card__image"
              src={image}
              width="260"
              height="200"
              alt="Place image"
            />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&#8364;{priceValue}</b>
              <span className="place-card__price-text">
                {' '}
                &#x2215;&#32;night
              </span>
            </div>
            <button
              className={`place-card__bookmark-button button ${
                userFavorites.some((fav) => fav === id)
                  ? 'place-card__bookmark-button--active'
                  : ''
              }`}
              type="button"
              onClick={() => {
                this._handleFavoritesUpdate(id);
              }}
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{name}</a>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
}

OfferCard.propTypes = {
  handleHover: PropTypes.func.isRequired,
  cardData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
    priceValue: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  handleFavoritesUpdate: PropTypes.func.isRequired,
  userFavorites: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default OfferCard;
