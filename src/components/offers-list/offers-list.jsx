import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFiltredOffers } from '../../reducer/data/selectors.js';
import withAddFavorites from '../../hocs/with-add-favorites/with-add-favorites.jsx';
import OfferCard from '../offer-card/offer-card.jsx';

let OffersList = memo(
  ({ filtredOffers, userFavorites, onToggleFavorites, getFavorites }) => {
    const favoritesIds = [...new Set(userFavorites.map((fav) => fav.id))];

    return (
      <div className="cities__places-list places__list tabs__content">
        {filtredOffers.map((offerData, i) => {
          return (
            <OfferCard
              key={`${i}-` + offerData.name.replace(/\s/g, '')}
              cardData={offerData}
              handleToggleFavorites={onToggleFavorites}
              handleGetFavorites={getFavorites}
              favoritesIds={favoritesIds}
            />
          );
        })}
        ;
      </div>
    );
  },
);

OffersList.propTypes = {
  filtredOffers: PropTypes.arrayOf(
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
  userFavorites: PropTypes.arrayOf(
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
  ).isRequired,
  onToggleFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filtredOffers: getFiltredOffers(state),
});

export { OffersList };

export default withAddFavorites(connect(mapStateToProps, null)(OffersList));
