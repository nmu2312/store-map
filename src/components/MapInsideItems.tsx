/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const MapInsideItems: FC<{ shops: any; map: google.maps.Map | null }> = ({
  shops,
  map,
}) => {
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

  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null,
  );
  const center = {
    lat: 35.409776993526116,
    lng: 136.75644950454605,
  };

  const [infoWindowTitle, setInfoWindowTitle] = useState('');
  const [infoWindowPosition, setInfoWindowPosition] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >(center);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onLoadInfoWindow = (infoWindowObj: google.maps.InfoWindow | null) => {
    setInfoWindow(infoWindowObj);
  };

  const showInfoWindow = (shop: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setInfoWindowTitle(shop?.title?.rendered);
    setInfoWindowPosition(generateLatLngLiteralFromShop(shop));
    // infoWindow?.open(map);
  };

  const divStyle = {
    background: 'white',
    fontSize: 7.5,
    display: 'none',
  };

  return (
    <>
      {shops.map((shop: any) => (
        <Marker
          key={shop?.id}
          position={generateLatLngLiteralFromShop(shop)}
          onClick={() => showInfoWindow(shop)}
        />
      ))}
      <InfoWindow position={infoWindowPosition}>
        <div style={divStyle}>{infoWindowTitle}あい</div>
      </InfoWindow>
    </>
  );
};

export default MapInsideItems;
