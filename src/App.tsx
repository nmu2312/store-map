/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import { FC, useEffect, useState } from 'react';
import ShopList from 'components/ShopList';
import PageNavigation from 'components/PageNavigation';
import './App.css';

const App: FC = () => {
  const [shops, setShops] = useState<unknown[]>([]);
  const [shopsToDisplay, setShopsToDisplay] = useState<unknown[]>([]);
  const [page, setPage] = useState(0);

  const [genre, setGenre] = useState<number[]>([]);
  const [cashless, setCashless] = useState(false);
  const [area, setArea] = useState(0);
  const [takeOut, setTakeOut] = useState(false);
  const [delivery, setDelivery] = useState(false);

  const shopsPerPage = 12;
  useEffect(() => {
    void (async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const shopData = await fetch(
        'https://www.cci-k.or.jp/gurume/wp/wp-json/wp/v2/shops?per_page=100&_embed',
        // eslint-disable-next-line consistent-return
      ).then((response) => response.json());
      setShops(shopData);
      // eslint-disable-next-line no-console
      console.log(shopData);
    })();
  }, []);

  useEffect(() => {
    if (shops.length === 0) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedShopsToDisplay = shops.filter((shop: any) => {
      if (cashless && shop?.custom_fields?.cashless?.[0] !== '1') {
        return false;
      }
      if (takeOut && shop?.custom_fields?.takeout?.[0] !== '1') {
        return false;
      }
      if (delivery && shop?.custom_fields?.delivery?.[0] !== '1') {
        return false;
      }

      return true;
    });
    setShopsToDisplay(updatedShopsToDisplay);
  }, [shops, genre, cashless, area, takeOut, delivery]);

  const switchPage = (pageIndex: number): void => {
    setPage(pageIndex);
  };

  return (
    <>
      <div>
        キャッシュレス
        <input
          type="checkbox"
          onChange={() => setCashless(!cashless)}
          checked={cashless}
        />
        テイクアウト
        <input
          type="checkbox"
          onChange={() => setTakeOut(!takeOut)}
          checked={takeOut}
        />
        デリバリー
        <input
          type="checkbox"
          onChange={() => setDelivery(!delivery)}
          checked={delivery}
        />
      </div>
      {shopsToDisplay.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <>
          {shopsToDisplay.length}
          <PageNavigation
            shops={shopsToDisplay}
            shopsPerPage={shopsPerPage}
            switchPage={switchPage}
          />
          <ShopList
            shops={shopsToDisplay}
            page={page}
            shopsPerPage={shopsPerPage}
          />
        </>
      )}
    </>
  );
};

export default App;
