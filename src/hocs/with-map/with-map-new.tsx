import * as React from 'react';
import * as leaflet from 'leaflet';
import { connect } from 'react-redux';
import { OfferInfo } from '../../types';
import { AppStateType } from '../../reducer/reducer';
import { getHoveredOffer } from '../../reducer/state/selectors';
import { Diff } from 'utility-types';

type StateToPropsTypes = {
  hoveredOffer: OfferInfo;
};

type OwnProps = {
  offers: OfferInfo[];
};

type InjectedPropsTypes = {};

type HocProps = StateToPropsTypes & OwnProps;

type State = {
  map: {};
  mapLayer: leaflet.LayerGroup | '';
};

export const withMap = <BasePropsTypes extends InjectedPropsTypes>(
  Component: React.ComponentType<BasePropsTypes>,
) => {
  const mapStateToProps = (state: AppStateType): StateToPropsTypes => ({
    hoveredOffer: getHoveredOffer(state),
  });

  class WithMap extends React.PureComponent<HocProps, State> {
    props: HocProps;
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

      let markersLayer: leaflet.Marker[] = [];

      offers.forEach((offer) => {
        const icon: leaflet.Icon = leaflet.icon({
          iconUrl: `/img/pin.svg`,
          iconSize: [30, 30],
          className: `offer-${offer.id}`,
        });

        markersLayer.push(
          leaflet.marker([offer.location.latitude, offer.location.longitude], {
            icon,
          }),
        );
      });

      let offersLayer = leaflet.layerGroup(markersLayer);

      offersLayer.addTo(map);
    }

    componentDidUpdate() {
      const { offers, hoveredOffer } = this.props;

      const hoveredOfferId = hoveredOffer?.id;

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
        let icon: leaflet.Icon;

        offer.id === hoveredOfferId
          ? (icon = leaflet.icon({
              iconUrl: `/img/pin-active.svg`,
              iconSize: [30, 30],
              className: `offer-${offer.id}`,
            }))
          : (icon = leaflet.icon({
              iconUrl: `/img/pin.svg`,
              iconSize: [30, 30],
              className: `offer-${offer.id}`,
            }));

        markersLayer.push(
          leaflet.marker([offer.location.latitude, offer.location.longitude], {
            icon,
          }),
        );
      });

      let offersLayer = leaflet.layerGroup(markersLayer);
      offersLayer.addTo(map);
    }

    render() {
      const { hoveredOffer, offers, ...propsToPass } = this.props;
      return <Component {...(propsToPass as BasePropsTypes)} />;
    }
  }

  const ConnectedHoc = connect<
    StateToPropsTypes,
    {},
    Diff<BasePropsTypes, InjectedPropsTypes>,
    AppStateType
  >(
    mapStateToProps,
    null,
  )(WithMap);

  return ConnectedHoc;
};
