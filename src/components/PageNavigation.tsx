import { FC } from 'react';

type Props = {
  shops: unknown[];
  shopsPerPage: number;
  page: number;
  setPage: (page: number) => void;
};

const PageNavigation: FC<Props> = ({ shops, shopsPerPage, page, setPage }) => (
  <>
    {shops.length > shopsPerPage && (
      <div>
        {[...Array(Math.ceil(shops.length / shopsPerPage)).keys()].map((n) => (
          <button
            className={n === page ? 'selected' : ''}
            type="button"
            onClick={() => setPage(n)}
            key={n}
          >
            {n + 1}
          </button>
        ))}
      </div>
    )}
  </>
);

export default PageNavigation;
