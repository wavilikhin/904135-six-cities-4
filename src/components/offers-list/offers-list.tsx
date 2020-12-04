import React, { memo } from "react";
import { connect } from "react-redux";
import { getSortedFiltredOffers } from "../../reducer/data/selectors";
import withAddFavorites from "../../hocs/with-add-favorites/with-add-favorites";
import { OfferCard, OfferInfo } from "../offer-card/offer-card";
const OfferCardWrapped = withAddFavorites(OfferCard);

interface Props {
  sortedFiltredOffers: OfferInfo[];
}

const OffersList: React.FC<Props> = memo(({ sortedFiltredOffers }) => {
  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedFiltredOffers.map((offerData, i) => {
        return (
          <OfferCardWrapped
            key={`${i}-` + offerData.name.replace(/\s/g, "")}
            cardData={offerData}
          />
        );
      })}
      ;
    </div>
  );
});

const mapStateToProps = (state) => ({
  sortedFiltredOffers: getSortedFiltredOffers(state),
});

export { OffersList };

export default connect(mapStateToProps, null)(OffersList);