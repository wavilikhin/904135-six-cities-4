import * as React from 'react';
import { OfferInfo } from '../../types';
import FavoriteCard from '../favorite-card';
import { withAddFavorites } from '../../hocs/with-add-favorites/with-add-favorites';

const FavoriteCardWrapped = withAddFavorites(FavoriteCard);

type OwnPropsTypes = {
  city: string;
  offers: OfferInfo[];
  handleOfferFocus: (id: number) => void;
};

type Props = OwnPropsTypes;

const FavoritesItem: React.FC<Props> = ({
  city,
  offers,
}): React.ReactElement => {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => {
          return (
            <FavoriteCardWrapped key={offer.city + offer.id} offer={offer} />
          );
        })}
      </div>
    </li>
  );
};

export default FavoritesItem;
