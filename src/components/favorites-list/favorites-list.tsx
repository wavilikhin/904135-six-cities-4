import * as React from 'react';
import { OfferInfo } from '../../types';
import FavoritesItem from '../favorites-item/favorites-item';

type OwnPropsTypes = {
  favorites: OfferInfo[];
};

type Props = OwnPropsTypes;

const FavoritesList: React.FC<Props> = ({ favorites }): React.ReactElement => {
  const cities: string[] = [
    ...new Set(favorites.map((favorite) => favorite.city)),
  ];

  return (
    <ul className="favorites__list">
      {cities.map((city, i) => {
        const offers = favorites
          .map((favorite) => {
            if (String(favorite.city) === String(city)) {
              return favorite;
            }
          })
          .filter((item) => !!item);

        return <FavoritesItem key={city + i} city={city} offers={offers} />;
      })}
    </ul>
  );
};

export default FavoritesList;
