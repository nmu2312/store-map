import { FC } from 'react';

type Props = {
  shops: unknown[];
  shopsPerPage: number;
  switchPage: (pageIndex: number) => void;
};

const PageNavigation: FC<Props> = ({ shops, shopsPerPage, switchPage }) => (
  <div>
    {[...Array(Math.ceil(shops.length / shopsPerPage)).keys()].map((n) => (
      <button type="button" onClick={() => switchPage(n)} key={n}>
        {n + 1}
      </button>
    ))}
  </div>
);

export default PageNavigation;
