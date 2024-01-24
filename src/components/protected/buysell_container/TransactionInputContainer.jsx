import React from 'react';

import FlexibleInput from './FlexibleInput';
import { ReactComponent as ArrowsIcon } from '../../../assets/icons/others/verical_arrows.svg';

function TransactionInputContainer({ onInputChange, value, spanValue }) {
  return (
    <div className="pt-10 pb-5 relative flex justify-center border-b-2 border-gray-border">
      <FlexibleInput value={value} onInputChange={onInputChange} />
      <div className="flex flex-col justify-center min-w-[64px] absolute right-4 bottom-[calc(50%-30px)] items-center">
        <div className="w-8 h-8 border-0 rounded-[14px] bg-gray-light flex justify-center items-center">
          <ArrowsIcon className="w-1/2 h-1/2" />
        </div>
        <span className="text-sm text-gray-border-darker text-center mt-1">
          {spanValue}
        </span>
      </div>
    </div>
  );
}

export default TransactionInputContainer;
