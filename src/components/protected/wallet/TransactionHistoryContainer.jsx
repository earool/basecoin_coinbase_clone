import React from 'react';
import { useSelector } from 'react-redux';

function TransactionHistoryContainer() {
  const { cash, transactions } = useSelector((store) => store.user.userAssets);

  const transactionArr = !transactions.length ? (
    <div className="flex justify-center items-center h-[25vh] text-gray-700">
      <p>Your transaction history is currently empty.</p>
    </div>
  ) : (
    <div>XD</div>
  );

  return (
    <div className="sm:main-container">
      <div className="border-b border-gray-border">
        <h4 className="ml-6 text-gray-700 py-1">Balance: ${cash}</h4>
      </div>
      {transactionArr}
    </div>
  );
}

export default TransactionHistoryContainer;
