import * as React from 'react';
import { connect } from 'react-redux';
import { getSortedFiltredOffers } from '../../reducer/data/selectors';
import { withAddFavorites } from '../../hocs/with-add-favorites/with-add-favorites';
import { OfferCard } from '../offer-card/offer-card';
import { OfferInfo } from '../../types';
import { AppStateType } from '../../reducer/reducer';
const OfferCardWrapped = withAddFavorites(OfferCard);

interface Props {
  sortedFiltredOffers: OfferInfo[];
}

const OffersList: React.FC<Props> = React.memo(({ sortedFiltredOffers }) => {
  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedFiltredOffers.map((offerData, i) => {
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
});

const mapStateToProps = (state: AppStateType) => ({
  sortedFiltredOffers: getSortedFiltredOffers(state),
});

export { OffersList };

export default connect(mapStateToProps, null)(OffersList);
