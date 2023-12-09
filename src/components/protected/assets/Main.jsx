import React from 'react';

import AssetsTable from './AssetsTable';
import ChartSection from './ChartSection';

function Main() {
  return (
    <main className="flex sm:bg-gray-bg-main">
      <div className="flex flex-col flex-1 sm:min-w-[600px] sm:max-w-[860px] lg:max-w-[1044px] [&>section]:w-[99%]">
        <section className="sm:px-6 sm:my-6 ">
          <ChartSection />
        </section>
        <section className="sm:px-6">
          <AssetsTable />
        </section>
      </div>
      <section className="hidden lg:block my-6 mr-6 min-w-[380px] h-[500px] main-container">
        Buy Sell Convert
      </section>
    </main>
  );
}

export default Main;
