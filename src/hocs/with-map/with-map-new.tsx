// TODO: Добавить редьюсер с картой , вынести стейт карты
// TODO: дотипизировать
import * as React from 'react';
import * as leaflet from 'leaflet';
import { OfferInfo } from '../../types';

interface Props {
  offers: OfferInfo[];
}

interface State {
  map: {};
  mapLayer: leaflet.LayerGroup | '';
}

export const withMap = (Component) => {
  class WithMap extends React.PureComponent<Props, State> {
    props: Props;
    state: State;

    constructor(props) {
      super(props);

      this.state = {
        map: {},
        mapLayer: '',
      };
    }

    componentDidMount() {
      const { offers } = this.props;

      if (offers.length === 0) return;

      const cityLat: number = offers[0].cityCoords[0];
      const cityLon: number = offers[0].cityCoords[1];
      const cityCoordinates: leaflet.LatLngTuple = [cityLat, cityLon];

      const zoom: number = offers[0].cityZoom;

      let map = leaflet.map(`map`, {
        center: [cityLat, cityLon],
        zoom,
        zoomControl: false,
      });

      map.setView(cityCoordinates, zoom);

      this.setState({
        map,
      });

      const mapLayer = leaflet
        .tileLayer(
          `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )

        .addTo(map);

      let markersLayer = [];

      offers.forEach((offer) => {
        markersLayer.push(
          leaflet.marker([offer.location.latitude, offer.location.longitude]),
        );
      });

      let offersLayer = leaflet.layerGroup(markersLayer);

      offersLayer.addTo(map);
    }

    componentDidUpdate() {
      const { offers } = this.props;

      if (offers.length === 0) return;

      const cityLat: number = offers[0].cityCoords[0];
      const cityLon: number = offers[0].cityCoords[1];
      const cityCoordinates: leaflet.LatLngTuple = [cityLat, cityLon];

      const zoom: number = offers[0].cityZoom;

      let map;

      Object.keys(this.state.map).length === 0
        ? (map = leaflet.map(`map`, {
            center: [cityLat, cityLon],
            zoom,
            zoomControl: false,
          }))
        : (map = this.state.map);

      map.setView(cityCoordinates, zoom);

      map.eachLayer(function (layer: leaflet.LayerGroup): void {
        map.removeLayer(layer);
      });

      this.setState({
        map,
      });

      const mapLayer = leaflet
        .tileLayer(
          `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )

        .addTo(map);

      let markersLayer = [];

      offers.forEach((offer) => {
        markersLayer.push(
          leaflet.marker([offer.location.latitude, offer.location.longitude]),
        );
      });

      let offersLayer = leaflet.layerGroup(markersLayer);

      offersLayer.addTo(map);
    }

    render() {
      return <Component />;
    }
  }

  return WithMap;
};
