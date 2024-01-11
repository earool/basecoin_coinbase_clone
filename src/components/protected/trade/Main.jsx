import React from 'react';

import TradeTable from './TradeTable';
import BuySellContainer from '../buysell_container/BuySellContainer';

function Main() {
  return (
    <main className="flex sm:bg-gray-bg-main">
      <section className="sm:m-6 flex-1 sm:min-w-[740px] sm:max-w-[960px] lg:max-w-[1044px]">
        <TradeTable />
      </section>
      <section className="hidden lg:block my-6 mr-6 w-[380px] h-fit">
        <BuySellContainer />
      </section>
    </main>
  );
}

export default Main;
