import React, { memo } from 'react';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

let CitiesList = memo((props) => {
  const { offersArray, currentCity, onActiveItemChange } = props;

  const uniqueCities = [];
  offersArray.map((offer) => {
    if (uniqueCities.indexOf(offer.city) === -1) {
      uniqueCities.push(offer.city);
    }
  });

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {uniqueCities.map((city, i) => {
          return (
            <li
              key={`${i}-` + city.replace(/\s/g, '')}
              className="locations__item"
            >
              <a
                onClick={(e) => {
                  e.preventDefault();
                  onActiveItemChange(city);
                }}
                className={`locations__item-link tabs__item ${
                  city === currentCity ? 'tabs__item--active' : ''
                }`}
                href="#"
              >
                <span>{city}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
});

export default withActiveItem(CitiesList, { stateUpdateRequired: true });

export { CitiesList };
