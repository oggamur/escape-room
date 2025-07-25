import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { URL_MARKER_CURRENT, SPB_COORDS } from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  location: number[];
};

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function MapContactsScreen(props: MapProps): JSX.Element {
  const { location } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, SPB_COORDS);
  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      const marker = new Marker({
        lat: location[0],
        lng: location[1],
      });

      marker.setIcon(currentCustomIcon).addTo(markerLayer);

      map.setView({
        lat: location[0],
        lng: location[1],
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, location]);

  return (
    <section
      className="cities__map map"
      style={{ height: '380px' }}
      ref={mapRef}
    />
  );
}

export default MapContactsScreen;
