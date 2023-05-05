import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as RightCaret } from '../../../assets/icons/others/right_caret.svg';
import MobileTransactionMenu from './MobileTransactionMenu';
import HomeTable from './HomeTable';
import TopMovers from './TopMovers';

function HomeMain() {
  const balance = 0;
  const balanceString = balance.toFixed(2);

  return (
    <main className="grid lg:ml-[calc((10vw-102.5px))] sm:grid-rows-smGridHome lg:grid-cols-lgGridHome border-y-2 border-gray-light sm:border-y-0">
      <section className="border-b-2 border-gray-light">
        <div className="mt-4 ml-5">
          <h6 className="text-sm text-gray-500">My balance</h6>
          <Link to="/u/assets" className="flex items-center mb-4">
            <h3 className="text-4xl -ml-[1px] font-medium">
              USD {balanceString}
            </h3>
            <RightCaret className="ml-1 w-5" />
          </Link>
        </div>
        <MobileTransactionMenu />
      </section>
      <HomeTable />
      <section className="hidden lg:block border-l border-gray-light col-start-2 col-end-3 row-start-1 row-end-3">
        <TopMovers />
      </section>
    </main>
  );
}

export default HomeMain;
