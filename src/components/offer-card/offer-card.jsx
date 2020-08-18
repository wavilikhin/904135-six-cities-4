import React, { PureComponent } from 'react';
import PropTypes, { number } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ActionCreator } from '../../reducer/data/data.js';

class OfferCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleUpdateFavorites = this._handleUpdateFavorites.bind(this);

    this._updateCurrentOffer = this._updateCurrentOffer.bind(this);
  }

  _handleUpdateFavorites(id) {
    this.props.handleUpdateFavorites(id);
  }

  _updateCurrentOffer(id) {
    this.props.handleCurrentOfferUpdate(id);
  }

  render() {
    const {
      cardData: { id, isPremium, image, priceValue, name, type },
      favoritesIds,
    } = this.props;

    return (
      <article className="cities__place-card place-card">
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
                favoritesIds.some((fav) => fav === id)
                  ? 'place-card__bookmark-button--active'
                  : ''
              }`}
              type="button"
              onClick={() => {
                this._handleUpdateFavorites(id);
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
            <Link
              to={`/offer/${id}`}
              onClick={() => {
                this._updateCurrentOffer(id);
              }}
            >
              {name}
            </Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
}

OfferCard.propTypes = {
  cardData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
    priceValue: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  handleUpdateFavorites: PropTypes.func.isRequired,
  favoritesIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleCurrentOfferUpdate: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleCurrentOfferUpdate(id) {
    dispatch(ActionCreator.updateCurrentOffer(id));
  },
});

export { OfferCard };

export default connect(null, mapDispatchToProps)(OfferCard);
