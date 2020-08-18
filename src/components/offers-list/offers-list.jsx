import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFiltredOffers } from '../../reducer/data/selectors.js';
import withAddFavorites from '../../hocs/with-add-favorites/with-add-favorites.jsx';
import OfferCard from '../offer-card/offer-card.jsx';
const OfferCardWrapped = withAddFavorites(OfferCard);

let OffersList = memo(
  ({ filtredOffers, handleFavoritesUpdate, favoritesIds }) => {
    return (
      <div className="cities__places-list places__list tabs__content">
        {filtredOffers.map((offerData, i) => {
          return (
            <OfferCardWrapped
              key={`${i}-` + offerData.name.replace(/\s/g, '')}
              cardData={offerData}
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
};

const mapStateToProps = (state) => ({
  filtredOffers: getFiltredOffers(state),
});

export { OffersList };

export default connect(mapStateToProps, null)(OffersList);
