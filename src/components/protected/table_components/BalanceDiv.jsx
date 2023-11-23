import React from 'react';

function BalanceDiv({ singleCoinValue, symbol, amount }) {
  return (
    <div>
      <p>${singleCoinValue}</p>
      <p>
        {amount} {symbol}
      </p>
    </div>
  );
}

export default BalanceDiv;
