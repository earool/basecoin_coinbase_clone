import React from 'react';

import TransactionHistoryContainer from './TransactionHistoryContainer';
import AddWithdrawContainer from './AddWithdrawContainer';
import { ReactComponent as DollarIcon } from '../../../assets/icons/others/dollar.svg';

function Main() {
  return (
    <main className="flex sm:bg-gray-bg-main flex-col h-[calc(100vh_-_84px)]">
      <section className="sm:m-4">
        <div className="border-b-2 border-gray-border [&>div]:ml-3">
          <div className="flex items-center text-3xl font-medium">
            <div>
              <DollarIcon className="w-[40px] h-[40px] mr-2 text-my-blue" />
            </div>
            <h1>Dollar</h1>
          </div>
          <div className="mt-2 border-black border-b  w-fit px-2 text-center">
            <p>Wallet</p>
          </div>
        </div>
      </section>
      <section className="flex">
        {/* <section className="sm:m-6 flex-1 sm:min-w-[740px] sm:max-w-[960px] lg:max-w-[1044px]"> */}
        <section className="sm:m-6 flex-1 sm:min-w-[640px] sm:max-w-[760px] lg:max-w-[844px]">
          <TransactionHistoryContainer />
        </section>
        <section className="hidden lg:block my-6 mr-6 w-[380px] h-fit">
          <AddWithdrawContainer />
        </section>
      </section>
    </main>
  );
}

export default Main;
