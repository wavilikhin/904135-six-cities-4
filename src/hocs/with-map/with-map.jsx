import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import * as COORDS from '../../__mocks__/coords.js';

export const withMap = (Component) => {
  class WithMap extends PureComponent {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      const { city, zoom, offers } = this.props;

      const icon = leaflet.icon({
        iconUrl: `img/pin.svg`,
        iconSize: [30, 30],
      });
      this.icon = icon;

      let cityCoords;

      city === null
        ? (cityCoords = [0, 0])
        : (cityCoords = COORDS[city.toUpperCase()]);

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

      let markersLayer = [];

      for (const offer in offers) {
        markersLayer.push(offer);
      }

      let offersLayer = leaflet.layerGroup(markersLayer);
      offersLayer.addTo(map);

      this.offersLayer = offersLayer;

      this.map = map;
    }

    componentDidUpdate() {
      const { city, zoom, offers } = this.props;

      let updatedCoords = COORDS[city.toUpperCase()];
      let updatedZoom = zoom;

      this.map.setView(updatedCoords, updatedZoom);

      let markersLayer = [];

      offers.forEach((offer) => {
        markersLayer.push(leaflet.marker(offer.coords, this.icon));
      });

      this.offersLayer.remove();

      let offersLayer = leaflet.layerGroup(markersLayer);

      this.offersLayer = offersLayer;

      offersLayer.addTo(this.map);
    }

    render() {
      return <Component />;
    }
  }

  WithMap.propTypes = {
    city: PropTypes.string,
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
  return WithMap;
};
