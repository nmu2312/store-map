/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import ShopItem from 'components/ShopItem';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ShopList: FC<{ shops: any[]; page: number; pageLength: number }> = ({
  shops,
  page,
  pageLength,
}) => {
  // eslint-disable-next-line no-console
  const shopsToDisplay = shops.slice(
    page * pageLength,
    (page + 1) * pageLength,
  );

  return (
    <>
      {shopsToDisplay.map((shop: any) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        <ShopItem shop={shop} key={shop.id} />
      ))}
    </>
  );
};

export default ShopList;
