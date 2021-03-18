/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC } from 'react';
import ShopItem from 'components/ShopItem';

type Props = {
  shops: unknown[];
  page: number;
  shopsPerPage: number;
};
const ShopList: FC<Props> = ({ shops, page, shopsPerPage }) => {
  const shopsToDisplay = shops.slice(
    page * shopsPerPage,
    (page + 1) * shopsPerPage,
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
