/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

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

  const onUnmount = useCallback(() => {
    setMap(null);
  }, [setMap]);

  const pan = () => {
    map?.panTo({ lat: 35.50461156824642, lng: 136.85881462186467 });
  };

  const generateLatLngLiteralFromShop = (
    shop: any,
  ): google.maps.LatLng | google.maps.LatLngLiteral => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const positions = shop?.custom_fields?.location[0]
      .split(',')
      .map((val: string): number => parseFloat(val));

    return {
      lat: positions[0],
      lng: positions[1],
    };
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
        {shops.map((shop: any) => (
          <Marker
            key={shop?.id}
            position={generateLatLngLiteralFromShop(shop)}
          />
        ))}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default Map;
