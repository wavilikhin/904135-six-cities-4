import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card.jsx';

class OffersList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentOffer: null,
    };

    this._handleHover = this._handleHover.bind(this);
  }

  _handleHover(hoveredOfferCard) {
    this.setState({
      currentOffer: hoveredOfferCard,
    });
  }

  render() {
    const { offersDataArray } = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offersDataArray.map((offerData, i) => {
          return (
            <OfferCard
              key={`${i}-` + offerData.name.replace(/\s/g, '')}
              cardData={offerData}
              handleHover={this._handleHover}
            />
          );
        })}
        ;
      </div>
    );
  }
}

OffersList.propTypes = {
  offersArray: PropTypes.arrayOf(
    PropTypes.shape({
      quality: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      priceValue: PropTypes.string.isRequired,
      priceText: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ),
};

export default OffersList;
