/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC, useCallback, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import MapInsideItems from 'components/MapInsideItems';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const Map: FC<{
  shops: unknown[];
  setMap: (mapObj: google.maps.Map | null) => void;
  map: google.maps.Map | null;
}> = ({ shops, setMap, map }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDuhNYyC3TslC2abfS1ZGOx8hSAuptODs4',
  });

  const center = {
    lat: 35.409776993526116,
    lng: 136.75644950454605,
  };

  const onLoad = useCallback(
    (mapObj) => {
      setMap(mapObj);
    },
    [setMap],
  );

  const [isShown, setIsShown] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [infoWindowTitle, setInfoWindowTitle] = useState<string>('');
  // const [infoWindowPosition, setInfoWindowPosition] = useState<
  //   google.maps.LatLng | google.maps.LatLngLiteral
  // >(center);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, [setMap]);

  const pan = () => {
    map?.panTo({ lat: 35.50461156824642, lng: 136.85881462186467 });
  };

  return isLoaded ? (
    <>
      <button type="button" onClick={pan}>
        pan
      </button>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <MapInsideItems shops={shops} map={map} />
      </GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default Map;
