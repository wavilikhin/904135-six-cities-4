import React, { memo } from 'react';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import OfferCard from '../offer-card/offer-card.jsx';

let OffersList = memo((props) => {
  const { offersArray, onActiveItemChange } = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersArray.map((offerData, i) => {
        return (
          <OfferCard
            key={`${i}-` + offerData.name.replace(/\s/g, '')}
            cardData={offerData}
            handleHover={onActiveItemChange}
          />
        );
      })}
      ;
    </div>
  );
});

export default withActiveItem(OffersList, { stateUpdateRequired: false });

export { OffersList };
