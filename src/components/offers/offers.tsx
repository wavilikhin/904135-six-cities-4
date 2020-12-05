import * as React from 'react';
import { connect } from 'react-redux';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import { getCity, getFiltredOffers } from '../../reducer/data/selectors';
import MainEmpty from '../main-empty/main-empty';
import PlaceSorting from '../place-sorting/place-sorting';
import { OfferInfo } from '../../types';

interface Props {
  filtredOffers: OfferInfo[];
  city: string;
}

const Offers: React.FC<Props> = ({ filtredOffers, city }) => {
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {filtredOffers.length} places to stay in {city}
          </b>
          <PlaceSorting />
          {filtredOffers.length === 0 ? (
            <MainEmpty city={city} />
          ) : (
            <OffersList />
          )}
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map offers={filtredOffers} />
          </section>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  city: getCity(state),
  filtredOffers: getFiltredOffers(state),
});

export { Offers };
export default connect(mapStateToProps, null)(Offers);
