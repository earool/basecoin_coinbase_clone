import React from 'react';
// import AssetsTable from './AssetsTable';

function Main() {
  return (
    <main className="flex sm:bg-gray-bg-main">
      <section className="sm:m-6 flex-1 sm:min-w-[740px] sm:max-w-[960px] lg:max-w-[1044px]">
        {/* <AssetsTable /> */}
      </section>
      <section className="hidden lg:block my-6 mr-6 min-w-[380px] h-[500px] main-container">
        Buy Sell Convert
      </section>
    </main>
  );
}

export default Main;
