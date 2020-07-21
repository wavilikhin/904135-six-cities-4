import React, { PureComponent } from 'react';
import PropTypes, { string } from 'prop-types';
import OfferCard from '../offer-card/offer-card.jsx';
import { connect } from 'react-redux';

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
    const { offersArray, city } = this.props;

    const filtredOffers = offersArray.filter((offer) => {
      return offer.city === city;
    });

    return (
      <div className="cities__places-list places__list tabs__content">
        {filtredOffers.map((offerData, i) => {
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
      coords: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
  ),
  city: PropTypes.string,
};

const mapStateToProps = (state) => ({
  offersArray: state.offers,
  city: state.city,
});

export { OffersList };
export default connect(mapStateToProps, null)(OffersList);
