/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import { FC, useEffect, useState, useCallback } from 'react';
import ShopList from 'components/ShopList';
import PageNavigation from 'components/PageNavigation';
import './App.css';

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shops, setShops] = useState<unknown[]>([]);
  const [shopsToDisplay, setShopsToDisplay] = useState<unknown[]>([]);
  const [page, setPage] = useState(0);
  const shopsPerPage = 12;

  interface genreObj {
    [key: string]: string;
  }
  const genres = {
    '2': '和食',
    '3': '洋食',
    '4': 'カフェ',
    '5': 'その他',
    '6': '中華料理',
  } as genreObj;

  const [activeGenres, setActiveGenres] = useState(['2', '3', '4', '5', '6']);
  const [area, setArea] = useState(0);
  const [cashless, setCashless] = useState(false);
  const [takeOut, setTakeOut] = useState(false);
  const [delivery, setDelivery] = useState(false);

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
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const updatedShopsToDisplay = shops.filter(
      (shop: any) =>
        !(
          (cashless && shop?.custom_fields?.cashless?.[0] !== '1') ||
          (takeOut && shop?.custom_fields?.takeout?.[0] !== '1') ||
          (delivery && shop?.custom_fields?.delivery?.[0] !== '1') ||
          (area && shop?.custom_fields?.area) ||
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          !activeGenres.includes(shop?.genre?.[0]?.toString())
        ),
    );
    setShopsToDisplay(updatedShopsToDisplay);
    setPage(0);
  }, [shops, activeGenres, cashless, area, takeOut, delivery]);

  const switchPage = useCallback(
    (pageIndex: number): void => {
      setPage(pageIndex);
    },
    [setPage],
  );

  const handleGenreChange = useCallback(
    (genreKey: string) => {
      if (activeGenres.includes(genreKey)) {
        setActiveGenres(activeGenres.filter((val) => val !== genreKey));
      } else {
        setActiveGenres([...activeGenres, genreKey]);
      }
    },
    [activeGenres],
  );

  return (
    <>
      ジャンル
      {Object.keys(genres).map((genreKey) => (
        <div key={genreKey}>
          <input
            type="checkbox"
            checked={activeGenres.includes(genreKey)}
            onChange={() => handleGenreChange(genreKey)}
          />
          {genres[genreKey]}
        </div>
      ))}
      <div>
        <input
          type="checkbox"
          onChange={() => setCashless(!cashless)}
          checked={cashless}
        />
        キャッシュレス
        <input
          type="checkbox"
          onChange={() => setTakeOut(!takeOut)}
          checked={takeOut}
        />
        テイクアウト
        <input
          type="checkbox"
          onChange={() => setDelivery(!delivery)}
          checked={delivery}
        />
        デリバリー
      </div>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          {shopsToDisplay.length}件
          <PageNavigation
            shops={shopsToDisplay}
            shopsPerPage={shopsPerPage}
            page={page}
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
