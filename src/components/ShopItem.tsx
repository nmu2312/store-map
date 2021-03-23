/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FC } from 'react';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shop: any;
  map: google.maps.Map | null;
};
const ShopItem: FC<Props> = ({ shop, map }) => {
  const generateLatLngLiteralFromShop = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    shopData: any,
  ): google.maps.LatLng | google.maps.LatLngLiteral => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const positions = shopData?.custom_fields?.location[0]
      .split(',')
      .map((val: string): number => parseFloat(val));

    return {
      lat: positions[0],
      lng: positions[1],
    };
  };

  const showShopInMap = (shopD: unknown) => {
    map?.panTo(generateLatLngLiteralFromShop(shopD));
    map?.setZoom(16);
  };

  return (
    <div>
      {shop.id}
      {shop.title.rendered}
      <button type="button" onClick={() => showShopInMap(shop)}>
        MAP
      </button>
    </div>
  );
};
export default ShopItem;
