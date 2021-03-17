import { FC, useEffect, useState } from 'react';
import ShopList from 'components/ShopList';
import './App.css';

const App: FC = () => {
  const [shops, setShops] = useState([]);
  const [page, setPage] = useState(0);
  const pageLength = 12;
  useEffect(() => {
    void (async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const shopData = await fetch(
        'https://www.cci-k.or.jp/gurume/wp/wp-json/wp/v2/shops?per_page=100&_embed',
        // eslint-disable-next-line consistent-return
      ).then((response) => response.json());
      setShops(shopData);
    })();
  }, []);

  const switchPage = (p: number): void => {
    setPage(p);
  };

  return (
    <>
      {shops.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <>
          {[...Array(Math.ceil(shops.length / pageLength)).keys()].map((n) => (
            <button type="button" onClick={() => switchPage(n)} key={n}>
              {n + 1}
            </button>
          ))}
          <ShopList shops={shops} page={page} pageLength={pageLength} />
        </>
      )}
    </>
  );
};

export default App;
