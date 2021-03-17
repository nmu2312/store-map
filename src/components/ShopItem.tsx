/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ShopItem: FC<{ shop: any }> = ({ shop }) => (
  // eslint-disable-next-line no-console
  // console.log(shop);

  <div>
    {shop.id}
    {shop.title.rendered}
  </div>
);
export default ShopItem;
