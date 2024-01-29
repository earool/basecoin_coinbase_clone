import React from 'react';

import PopoutHeader from '../buysell_container/PopoutHeader';
import formatPrice from '../../../utils/formatPrice';
import Button from '../../UI/Button';

function WalletPopout({ action, onToggle, value }) {
  const title = action === 'Cash out' ? 'Cash out preview' : 'Add cash preview';
  const fee = 0.55;

  return (
    // <div className="flex flex-col items-center pt-5 px-5 pb-7 relative">
    <>
      <PopoutHeader onClose={onToggle} title={title} />
      <div className="text-my-blue text-[36px] mb-3">
        <h2>${formatPrice(value)}</h2>
      </div>
      <div className="[&>div]:flex [&>div]:justify-between [&>div]:mb-2 [&>div>p:nth-child(even)]:text-gray-500 w-full text-sm">
        <div>
          <p>{action} amount</p>
          <p>${value - fee}</p>
        </div>
        <div>
          <p>{action} fee</p>
          <p>${fee}</p>
        </div>
        <div>
          <p className="font-medium">Total</p>
          <p>${formatPrice(value)}</p>
        </div>
        <div className="mt-8">
          <Button color="blue" ifFull>
            {action}
          </Button>
        </div>
      </div>
    </>
    // </div>
  );
}

export default WalletPopout;
