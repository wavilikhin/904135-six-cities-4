import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import leaflet from 'leaflet';

class Map extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { city, zoom, offers } = this.props;

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30],
    });

    const cityCoords = city.coords;

    const map = leaflet.map(`map`, {
      center: cityCoords,
      zoom: zoom,
      zoomControl: false,
      marker: true,
    });

    map.setView(cityCoords, zoom);

    leaflet
      .tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      )
      .addTo(map);

    for (const offer of offers) {
      leaflet.marker(offer.coords, { icon }).addTo(map);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ height: '100vh' }} id="map"></div>
      </React.Fragment>
    );
  }
}

export default Map;

Map.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string,
    coords: PropTypes.arrayOf(PropTypes.number),
  }),
  zoom: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(
    PropTypes.shape({
      quality: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      priceValue: PropTypes.string.isRequired,
      priceText: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      coords: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
  ).isRequired,
};
