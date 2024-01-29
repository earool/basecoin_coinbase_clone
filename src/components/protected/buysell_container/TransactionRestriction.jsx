import React from 'react';

import { ReactComponent as WarningIcon } from '../../../assets/icons/others/warning_icon.svg';

function TransactionRestriction({ type }) {
  const message = {
    'No cash': (
      <p>
        Your wallet is currently empty.
        <br />
        Add funds to make purchases.
      </p>
    ),
    'No owned assets':
      'Currently, there are no owned assets in your portfolio available for sale or conversion',
  };

  return (
    <div className="h-[260px] flex flex-col items-center mt-[25%]">
      <div>
        <div className="text-my-blue flex justify-center mb-4">
          <WarningIcon className="w-[56px] h-[56px]" />
        </div>
        <div className="text-gray-500 text-sm text-center">
          <p>{message[type]}</p>
          <p>Thank you!</p>
        </div>
      </div>
    </div>
  );
}

export default TransactionRestriction;
