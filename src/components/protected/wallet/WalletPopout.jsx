import React from 'react';
import { useDispatch } from 'react-redux';

import PopoutHeader from '../buysell_container/PopoutHeader';
import formatPrice from '../../../utils/formatPrice';
import Button from '../../UI/Button';
import { makeCashAction } from '../../../store/userSlice';

function WalletPopout({ action, onToggle, value, fee, resetInputValue }) {
  const dispatch = useDispatch();

  const isWithdraw = action === 'Cash out';
  const title = isWithdraw ? 'Cash out preview' : 'Add cash preview';

  const handleCashAction = () => {
    dispatch(makeCashAction(action, value - fee));
    onToggle();
    resetInputValue();
  };

  return (
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
          <Button color="blue" ifFull onClick={handleCashAction}>
            {action}
          </Button>
        </div>
      </div>
    </>
  );
}

export default WalletPopout;
