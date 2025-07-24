import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { BookedQuest } from '../../types/state';
import {
  URL_MARKER_DEFAULT,
  URL_MARKER_CURRENT,
  SPB_COORDS,
} from '../../const';
import 'leaflet/dist/leaflet.css';
import { setActiveBookingData } from '../../store/booking-process/booking-process';
import { useAppDispatch } from '../../hooks';

type MapProps = {
  quests: BookedQuest[];
  activeQuest: BookedQuest | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function MapScreen(props: MapProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { quests, activeQuest } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, SPB_COORDS);
  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      quests.forEach((quest) => {
        const marker = new Marker({
          lat: quest.location.coords[0],
          lng: quest.location.coords[1],
        });
        marker.addEventListener('click', () => {
          dispatch(setActiveBookingData(quest));
        });
        marker
          .setIcon(
            activeQuest !== null && activeQuest.id === quest.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      map.setView({
        lat: SPB_COORDS[0],
        lng: SPB_COORDS[1],
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, quests, activeQuest, dispatch]);

  return (
    <section
      className="cities__map map"
      style={{ height: '540px' }}
      ref={mapRef}
    />
  );
}

export default MapScreen;
