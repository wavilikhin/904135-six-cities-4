import React from 'react';
import { withMap } from '../../hocs/with-map/with-map.jsx';

const Map = () => {
  return <div style={{ height: '100vh' }} id="map"></div>;
};

export default withMap(Map);
