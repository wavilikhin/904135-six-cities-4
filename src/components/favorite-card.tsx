import * as React from 'react';
import { OfferInfo } from '../types';
import { Link } from 'react-router-dom';

type OwnPropsTypes = {
  offer: OfferInfo;
  favoritesIds: number[];
  handleFavoritesUpdate: (id: number) => void;
};

type Props = OwnPropsTypes;

const FavoriteCard: React.FC<Props> = ({
  offer,
  favoritesIds,
  handleFavoritesUpdate,
}): React.ReactElement => {
  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.image}
            width={150}
            height={110}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.priceValue}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              favoritesIds.some((fav) => fav === offer.id)
                ? 'place-card__bookmark-button--active'
                : ''
            }`}
            type="button"
            onClick={() => {
              handleFavoritesUpdate(offer.id);
            }}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 2 * 10}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`offer/${offer.id}`}>{offer.name}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

export default FavoriteCard;
