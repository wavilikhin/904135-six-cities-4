import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class OfferCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  _handleMouseEnter() {
    this.props.handleHover(this.props.cardData);
  }

  _handleMouseLeave() {
    this.props.handleHover('');
  }

  render() {
    const {
      handleHover,
      cardData: { quality, image, priceValue, priceText, name, type },
    } = this.props;

    return (
      <article
        className="cities__place-card place-card"
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
      >
        <div className="place-card__mark">
          <span>{quality}</span>
        </div>
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img
              className="place-card__image"
              src={image}
              width="260"
              height="200"
              alt="Place image"
            />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">{priceValue}</b>
              <span className="place-card__price-text">{priceText}</span>
            </div>
            <button
              className="place-card__bookmark-button button"
              type="button"
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{name}</a>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
}

// const OfferCard = ({ handleHover, cardData }) => {
//   const { quality, image, priceValue, priceText, name, type } = cardData;

//   return (
//     <article
//       className="cities__place-card place-card"
//       onMouseEnter={(evt) => {
//         handleHover(evt.currentTarget);
//       }}
//       onMouseLeave={(evt) => {
//         handleHover('');
//       }}
//     >
//       <div className="place-card__mark">
//         <span>{quality}</span>
//       </div>
//       <div className="cities__image-wrapper place-card__image-wrapper">
//         <a href="#">
//           <img
//             className="place-card__image"
//             src={image}
//             width="260"
//             height="200"
//             alt="Place image"
//           />
//         </a>
//       </div>
//       <div className="place-card__info">
//         <div className="place-card__price-wrapper">
//           <div className="place-card__price">
//             <b className="place-card__price-value">{priceValue}</b>
//             <span className="place-card__price-text">{priceText}</span>
//           </div>
//           <button className="place-card__bookmark-button button" type="button">
//             <svg className="place-card__bookmark-icon" width="18" height="19">
//               <use xlinkHref="#icon-bookmark"></use>
//             </svg>
//             <span className="visually-hidden">To bookmarks</span>
//           </button>
//         </div>
//         <div className="place-card__rating rating">
//           <div className="place-card__stars rating__stars">
//             <span></span>
//             <span className="visually-hidden">Rating</span>
//           </div>
//         </div>
//         <h2 className="place-card__name">
//           <a href="#">{name}</a>
//         </h2>
//         <p className="place-card__type">{type}</p>
//       </div>
//     </article>
//   );
// };

OfferCard.propTypes = {
  handleHover: PropTypes.func.isRequired,
  cardData: PropTypes.shape({
    quality: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    priceValue: PropTypes.string.isRequired,
    priceValue: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default OfferCard;
