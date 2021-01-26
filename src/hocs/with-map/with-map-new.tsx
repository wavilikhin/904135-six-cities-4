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
  offers: OfferInfo[] | null;
  map: leaflet.Map | null;
  mapLayer: leaflet.Layer | null;
  markersLayer: leaflet.Marker[] | null;
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
        map: null,
        mapLayer: null,
        offers: null,
        markersLayer: null,
      };
    }

    componentDidMount() {
      const { offers } = this.props;
      // Creating base map
      let map = leaflet.map(`map`, {
        center: [51.22172, 6.1],
        zoom: 12,
        zoomControl: false,
      });
      // Setting base map layer
      const mapLayer = leaflet
        .tileLayer(
          `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )

        .addTo(map);
      // If the only provided offer === mocked offer returning base map
      if (offers.length === 1 && offers[0].city === '') {
        map.setView([51.22172, 6.77616], 12);

        this.setState({
          map,
          mapLayer,
        });
        return;
      }
      // If offers are provided setting up markers layer
      const cityLat: number = offers[0].cityCoords[0];
      const cityLon: number = offers[0].cityCoords[1];
      const cityCoordinates: leaflet.LatLngTuple = [cityLat, cityLon];

      const zoom: number = offers[0].cityZoom;

      map.setView(cityCoordinates, zoom);

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

      this.setState({
        map,
        mapLayer,
        offers,
      });
    }

    componentDidUpdate() {
      console.count('updated');
      const { offers, hoveredOffer } = this.props;

      // Handling pin change for hovered offer
      const hoveredOfferId = hoveredOffer?.id;

      // If hoveredOffer = undefined making all pins basic color
      if (!hoveredOfferId && this.state.markersLayer) {
        let currentMarkers = this.state.markersLayer;
        currentMarkers.forEach((marker) =>
          marker.setIcon(
            leaflet.icon({
              iconUrl: `/img/pin.svg`,
              iconSize: [30, 30],
              className: `offer-${
                marker.options.icon.options.className.split('-')[1]
              }`,
            }),
          ),
        );
        // If hoveredOffer != undefined making it's pin active color
      } else if (hoveredOffer && this.state.markersLayer) {
        let currentMarkers = this.state.markersLayer;
        if (currentMarkers !== null) {
          currentMarkers.forEach((marker) => {
            if (
              Number(marker.options.icon.options.className.split('-')[1]) ===
              Number(hoveredOfferId)
            ) {
              marker.setIcon(
                leaflet.icon({
                  iconUrl: `/img/pin-active.svg`,
                  iconSize: [30, 30],
                  className: `offer-${
                    marker.options.icon.options.className.split('-')[1]
                  }`,
                }),
              );
            }
          });
        }
      }

      if (offers.length === 0) return;

      const cityLat: number = offers[0].cityCoords[0];
      const cityLon: number = offers[0].cityCoords[1];
      const cityCoordinates: leaflet.LatLngTuple = [cityLat, cityLon];

      const zoom: number = offers[0].cityZoom;

      let map = this.state.map;
      let mapLayer = this.state.mapLayer;
      const currentOffers = this.state.offers;

      map.setView(cityCoordinates, zoom);

      // If offers array changed updating pins layer
      if (currentOffers !== offers) {
        map.eachLayer(function (layer: leaflet.LayerGroup): void {
          if (layer !== mapLayer) {
            map.removeLayer(layer);
          }
        });

        let markersLayer: leaflet.Marker[] = [];

        offers.forEach((offer) => {
          let icon = leaflet.icon({
            iconUrl: `/img/pin.svg`,
            iconSize: [30, 30],
            className: `offer-${offer.id}`,
          });
          markersLayer.push(
            leaflet.marker(
              [offer.location.latitude, offer.location.longitude],
              {
                icon,
              },
            ),
          );
        });

        let offersLayer = leaflet.layerGroup(markersLayer);
        offersLayer.addTo(map);

        this.setState({
          map,
          offers,
          markersLayer,
        });
      }

      this.setState({
        map,
      });
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
