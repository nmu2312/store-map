import { FC } from 'react';

type Props = {
  shops: unknown[];
  shopsPerPage: number;
  page: number;
  switchPage: (pageIndex: number) => void;
};

const PageNavigation: FC<Props> = ({
  shops,
  shopsPerPage,
  page,
  switchPage,
}) => (
  <>
    {shops.length > shopsPerPage && (
      <div>
        {[...Array(Math.ceil(shops.length / shopsPerPage)).keys()].map((n) => (
          <button
            className={n === page ? 'selected' : ''}
            type="button"
            onClick={() => switchPage(n)}
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
