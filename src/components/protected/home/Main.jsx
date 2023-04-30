import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as RightCaret } from '../../../assets/icons/others/right_caret.svg';
import MobileTransactionMenu from './MobileTransactionMenu';
import HomeTable from './HomeTable';

function HomeMain({ data }) {
  const balance = 0;
  const balanceString = balance.toFixed(2);

  return (
    <main className="grid sm:grid-rows-smGridHome mr-4 grid-cols-1">
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
      <section className="max-w-[960px] min-w-[400px]">
        <HomeTable data={data} />
      </section>
    </main>
  );
}

export default HomeMain;
