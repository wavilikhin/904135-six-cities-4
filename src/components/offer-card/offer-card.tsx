import * as React from 'react';
import { Link } from 'react-router-dom';
import { OfferInfo } from '../../types';

interface Props {
  cardData: OfferInfo;
  handleFavoritesUpdate: (id: number) => void;
  favoritesIds: number[];
}

class OfferCard extends React.PureComponent<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this._handleUpdateFavorites = this._handleUpdateFavorites.bind(this);
  }

  _handleUpdateFavorites(id: number): void {
    this.props.handleFavoritesUpdate(id);
  }

  render() {
    const {
      cardData: { id, isPremium, image, priceValue, name, type, raiting },
      favoritesIds,
    } = this.props;
    const raitingStars = raiting * 2 * 10;

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
              <span style={{ width: `${raitingStars}%` }}></span>
              <span className="visually-hidden">Raiting</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link id="linkToOffer" to={`/offer/${id}`}>
              {name}
            </Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
}

export { OfferCard, OfferInfo };
