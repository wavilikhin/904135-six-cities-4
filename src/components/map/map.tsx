import * as React from 'react';
import { withMap } from '../../hocs/with-map/with-map-new';

const Map: React.FC = () => {
  return <div style={{ height: '100%' }} id="map"></div>;
};

export default withMap(Map);
