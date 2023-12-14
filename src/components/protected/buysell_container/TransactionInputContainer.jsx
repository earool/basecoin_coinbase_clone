import React from 'react';

import FlexibleInput from './FlexibleInput';
import { ReactComponent as ArrowsIcon } from '../../../assets/icons/others/verical_arrows.svg';

function TransactionInputContainer() {
  return (
    <div className="py-10 relative flex justify-center">
      <FlexibleInput />
      <div className="flex flex-col justify-center min-w-[64px] absolute right-0 bottom-[calc(50%-26px)]">
        <div className="w-8 h-8 border-0 rounded-[14px] bg-gray-light flex justify-center items-center">
          <ArrowsIcon className="w-1/2 h-1/2" />
        </div>
        <span className="text-sm text-gray-border-darker">BTC</span>
      </div>
    </div>
  );
}

export default TransactionInputContainer;
