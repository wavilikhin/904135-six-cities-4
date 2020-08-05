import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

export const withMap = (Component) => {
  class WithMap extends PureComponent {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      const { offers } = this.props;

      const icon = leaflet.icon({
        iconUrl: `img/pin.svg`,
        iconSize: [30, 30],
      });
      this.icon = icon;

      let cityCoords;
      let zoom;

      offers.length > 0
        ? (cityCoords = offers[0].cityCoords)
        : (cityCoords = [0, 0]);

      offers.length > 0 ? (zoom = offers[0].cityZoom) : (zoom = 12);

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
      const { offers } = this.props;

      let updatedCoords;
      let updatedZoom;

      offers.length > 0
        ? (updatedCoords = offers[0].cityCoords)
        : (updatedCoords = [0, 0]);

      offers.length > 0
        ? (updatedZoom = offers[0].cityZoom)
        : (updatedZoom = 12);

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
    offers: PropTypes.arrayOf(
      PropTypes.shape({
        city: PropTypes.string.isRequired,
        cityZoom: PropTypes.number.isRequired,
        isPremium: PropTypes.bool.isRequired,
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
