/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { FC, useEffect, useState, useCallback } from 'react';
import ShopList from 'components/ShopList';
import PageNavigation from 'components/PageNavigation';
import Map from 'components/Map';

import {
  genres,
  Area,
  areas,
  identifyAreaFromAddress,
} from 'data/SearchValues';
import './App.css';

const App: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<google.maps.Map | null>(null);
  // const handleMapChange = useCallback((mapObj: google.maps.Map | null) => {
  //   setMap(mapObj);
  // }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [shops, setShops] = useState<unknown[]>([]);
  const [shopsToDisplay, setShopsToDisplay] = useState<unknown[]>([]);
  const [page, setPage] = useState(0);
  const shopsPerPage = 12;

  const [area, setArea] = useState<Area>('全て');
  const [activeGenres, setActiveGenres] = useState(['2', '3', '4', '5', '6']);
  const [cashless, setCashless] = useState(false);
  const [takeOut, setTakeOut] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    void (async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const shopData = await fetch(
        'https://www.cci-k.or.jp/gurume/wp-json/wp/v2/shops?per_page=100&_embed',
        // eslint-disable-next-line consistent-return
      ).then((response) => response.json());
      setShops(shopData);
      // eslint-disable-next-line no-console
      console.log(shopData);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    setShopsToDisplay(
      shops.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (shop: any): boolean =>
          activeGenres.includes(shop?.genre[0]?.toString()) &&
          (!cashless || shop?.custom_fields?.cashless[0] === '1') &&
          (!takeOut || shop?.custom_fields?.takeout[0] === '1') &&
          (!delivery || shop?.custom_fields?.delivery[0] === '1') &&
          (keyword.length === 0 ||
            (
              shop?.title?.rendered?.toLowerCase() +
              shop?.custom_fields?.copy[0]?.toLowerCase() +
              shop?.custom_fields?.address[0] +
              genres[shop?.genre[0]?.toString()]
            ).includes(keyword)) &&
          (area === '全て' ||
            area === identifyAreaFromAddress(shop?.custom_fields?.address[0])),
      ),
    );
    setPage(0);
  }, [shops, activeGenres, cashless, area, delivery, takeOut, keyword]);

  const switchPage = useCallback(
    (pageIndex: number): void => {
      setPage(pageIndex);
    },
    [setPage],
  );

  const handleGenreChange = useCallback(
    (genreKey: string): void => {
      if (activeGenres.includes(genreKey)) {
        setActiveGenres(activeGenres.filter((val) => val !== genreKey));
      } else {
        setActiveGenres([...activeGenres, genreKey]);
      }
    },
    [activeGenres],
  );

  const handleKeywordChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>): void => {
      if (
        !(event.target instanceof HTMLInputElement) ||
        event.target.value.length === 1
      ) {
        return;
      }
      setKeyword(event.target.value);
    },
    [],
  );

  return (
    <>
      <Map shops={shopsToDisplay} setMap={setMap} map={map} />
      地区
      {areas.map((areaVal) => (
        <div key={areaVal}>
          <input
            type="radio"
            checked={area === areaVal}
            onChange={() => setArea(areaVal)}
          />
          {areaVal}
        </div>
      ))}
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
      <div>
        キーワード
        <input type="text" onInput={(e) => handleKeywordChange(e)} />
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
