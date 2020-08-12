import React, { memo } from 'react';
import PropTypes from 'prop-types';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import OfferCard from '../offer-card/offer-card.jsx';

let OffersList = memo(
  ({ offersArray, userFavorites, onActiveItemChange, onFavoritesUpdate }) => {
    return (
      <div className="cities__places-list places__list tabs__content">
        {offersArray.map((offerData, i) => {
          return (
            <OfferCard
              key={`${i}-` + offerData.name.replace(/\s/g, '')}
              cardData={offerData}
              handleHover={onActiveItemChange}
              handleFavoritesUpdate={onFavoritesUpdate}
              userFavorites={userFavorites}
            />
          );
        })}
        ;
      </div>
    );
  },
);

OffersList.propTypes = {
  offersArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      cityCoords: PropTypes.arrayOf(PropTypes.number, PropTypes.number),
      isPremium: PropTypes.bool.isRequired,
      image: PropTypes.string.isRequired,
      priceValue: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      coords: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
    }),
  ),
  userFavorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  onActiveItemChange: PropTypes.func.isRequired,
  onFavoritesUpdate: PropTypes.func.isRequired,
};

export default withActiveItem(OffersList, { stateUpdateRequired: false });

export { OffersList };
