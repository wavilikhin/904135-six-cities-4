import React, { memo } from 'react';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

let CitiesList = memo((props) => {
  const { currentCity, uniqueCities, onActiveItemChange } = props;

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {uniqueCities.map((city, i) => {
          return (
            <li key={`${i}-${city}`} className="locations__item">
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

export default withActiveItem(CitiesList, {
  stateUpdateRequired: true,
});

export { CitiesList };
