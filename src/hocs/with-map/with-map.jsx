import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

export const withMap = (Component) => {
  class WithMap extends PureComponent {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      console.count(`Map mounted`);
      const { offers } = this.props;

      const icon = leaflet.icon({
        iconUrl: `img/pin.svg`,
        iconSize: [30, 30],
      });
      this.icon = icon;

      if (offers.length === 0) return;

      let cityCoords = offers[0].cityCoords;
      let zoom = offers[0].cityZoom;

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

      for (const offer of offers) {
        markersLayer.push(
          leaflet.marker(
            [offer.location.latitude, offer.location.longitude],
            icon,
          ),
        );
      }

      let offersLayer = leaflet.layerGroup(markersLayer);
      offersLayer.addTo(map);

      this.offersLayer = offersLayer;

      this.map = map;
    }

    componentDidUpdate() {
      console.count(`Map updated`);
      const { offers } = this.props;

      let updatedCoords = offers[0].cityCoords;
      let updatedZoom = 12;
      let updatedMap;

      this.map
        ? (updatedMap = this.map)
        : (updatedMap = leaflet.map(`map`, {
            center: updatedCoords,
            zoom: updatedZoom,
            zoomControl: false,
            marker: true,
          }));

      updatedMap.setView(updatedCoords, updatedZoom);
      leaflet
        .tileLayer(
          `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(updatedMap);

      let markersLayer = [];
      offers.forEach((offer) => {
        markersLayer.push(
          leaflet.marker(
            [offer.location.latitude, offer.location.longitude],
            this.icon,
          ),
        );
      });

      this.offersLayer ? this.offersLayer.remove() : null;

      let offersLayer = leaflet.layerGroup(markersLayer);
      offersLayer.addTo(updatedMap);

      this.offersLayer = offersLayer;
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
        priceValue: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        coords: PropTypes.arrayOf(PropTypes.number).isRequired,
      }),
    ).isRequired,
  };
  return WithMap;
};
