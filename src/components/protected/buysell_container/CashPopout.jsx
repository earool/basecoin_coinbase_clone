import React from 'react';
import { ReactComponent as DollarSign } from '../../../assets/icons/others/dollar.svg';
import { ReactComponent as DoneSign } from '../../../assets/icons/others/done.svg';

function CashPopout({ data }) {
  const { amount, name } = data;

  return (
    <div className="flex mb-6 mr-8 relative">
      <div className="w-4 h-4 text-my-blue absolute right-[-30px] top-[-2px]">
        <DoneSign />
      </div>
      <div className="flex justify-center pr-4">
        <DollarSign className="w-8 h-8 text-my-blue" />
      </div>
      <div className="flex-1 text-sm">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">{name}</h3>
          <span className="text-gray-500">${amount}</span>
        </div>
        <p className="text-gray-500">
          No buying limit, and instant
          <br />
          access to your assets. Add cash
          <br />
          from your bank to use.
        </p>
      </div>
    </div>
  );
}

export default CashPopout;
