import React, { PureComponent } from "react";
import leaflet from "leaflet";
import { OfferInfo } from "../../components/offer-card/offer-card";
interface Props {
  offers: OfferInfo[];
}

export const withMap = (Component) => {
  class WithMap extends PureComponent<Props> {
    props: Props;

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
          }
        )
        .addTo(map);

      let markersLayer = [];

      for (const offer of offers) {
        markersLayer.push(
          leaflet.marker(
            [offer.location.latitude, offer.location.longitude],
            icon
          )
        );
      }

      let offersLayer = leaflet.layerGroup(markersLayer);
      offersLayer.addTo(map);

      this.offersLayer = offersLayer;

      this.map = map;
    }

    componentDidUpdate() {
      const { offers } = this.props;
      console.log(offers);

      if (offers.length === 0) return;

      let updatedCoords = offers[0].cityCoords;
      let updatedZoom = 12;

      this.map
        ? this.map.setView(updatedCoords, updatedZoom)
        : (this.map = leaflet.map(`map`, {
            center: updatedCoords,
            zoom: updatedZoom,
            zoomControl: false,
            marker: true,
          }));

      // this.map
      //   ? (updatedMap = this.map)
      //   : (updatedMap = leaflet.map(`map`, {
      //       center: updatedCoords,
      //       zoom: updatedZoom,
      //       zoomControl: false,
      //       marker: true,
      //     }));

      this.map.setView(updatedCoords, updatedZoom);
      leaflet
        .tileLayer(
          `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          }
        )
        .addTo(this.map);

      let markersLayer = [];
      offers.forEach((offer) => {
        markersLayer.push(
          leaflet.marker(
            [offer.location.latitude, offer.location.longitude],
            this.icon
          )
        );
      });

      this.offersLayer ? this.offersLayer.remove() : null;

      let offersLayer = leaflet.layerGroup(markersLayer);
      offersLayer.addTo(this.map);

      this.offersLayer = offersLayer;
    }

    render() {
      return <Component />;
    }
  }

  return WithMap;
};
